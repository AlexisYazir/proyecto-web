import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  // Función para verificar si la parte de la URL es un identificador (por ejemplo, un ID largo)
  const isDynamicSegment = (path) => {
    return path.length > 20; // Puedes ajustar la longitud o la condición de acuerdo con tu patrón de datos
  };

  return (
    <nav aria-label="breadcrumb">
      <ul style={styles.breadcrumb}>
        <li>
          <Link to="/" style={styles.link}>Inicio</Link>
        </li>
        {paths.map((path, index) => {
          // Excluye los segmentos dinámicos (ej. IDs largos)
          if (isDynamicSegment(path)) {
            path = "[ID]";  // Reemplaza el valor dinámico con algo que prefieras mostrar
          }

          const url = `/${paths.slice(0, index + 1).join("/")}`;
          return (
            <li key={index}>
              <span style={styles.separator}> &gt; </span>
              <Link to={url} style={styles.link}>{path}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const styles = {
  breadcrumb: {
    display: "flex",
    listStyle: "none",
    padding: "10px",
    fontSize: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  separator: {
    margin: "0 5px",
  }
};

export default Breadcrumbs;
