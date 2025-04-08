import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

const USERS_PER_PAGE = 5;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Sempre que a busca ou ordenação mudar, refiltra e reordena os usuários
  useEffect(() => {
    let result = [...users];

    if (searchText.trim() !== "") {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortAscending) {
        // poderia usar também o result.sort((a, b) => a.name > b.name ? 1 : -1) 
        // (que foi a primeira abordagem), porém ele é menos seguro já que ignora acentos
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredUsers(result);
    setCurrentPage(1); // evita o "pagina nao encontrada" 
  }, [searchText, sortAscending, users]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // const paginatedUsers = filteredUsers.reduce<User[]>((acc, user, index) => {
  //   const start = (currentPage - 1) * USERS_PER_PAGE;
  //   const end = currentPage * USERS_PER_PAGE;
  
  //   if (index >= start && index < end) {
  //     acc.push(user);
  //   }
  
  //   return acc;
  // }, []);

  // ^^^^ inicialmente pensei em fazer com a função comentada acima (com reduce) ^^^^
  // porém o .reduce acaba percorrendo todos os itens doa rray mesmo que não vai usar todos
  // com o .slice ele já pega somente os necessarios
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const showOriginalUsers = () => {
    setFilteredUsers(users);
    setCurrentPage(1);
    setSearchText("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortAscending((prev) => !prev);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchText}
          onChange={handleSearchChange}
          style={{ padding: "0.5rem", width: "200px", marginRight: "10px" }}
        />

        <button onClick={toggleSortOrder} style={{ marginRight: "10px" }}>
          Ordenar por nome ({sortAscending ? "A-Z" : "Z-A"})
        </button>

        <button onClick={loadUsers}>Recarregar</button>

        <button onClick={showOriginalUsers}>Recarregar sem requisição</button>
      </div>

      {isLoading ? (
        <p>Carregando usuários...</p>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <ul>
              {paginatedUsers.map((user) => (
                <li key={user.id} style={{ marginBottom: "1rem" }}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}

          {/* Paginação */}
          {filteredUsers.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #999",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Pagina Anterior
              </button>

              {Array.from({ length: totalPages }, (_, pageIndex) => pageIndex + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  disabled={pageNumber === currentPage}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #999",
                    cursor: "pointer",
                  }}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #999",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Proxima Pagina
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
