export default function Nota(args) {
  return (
    <div className="nota">
      <p>
        <h1>{args.titulo}</h1> <p>{args.cuerpo}</p>
        <div className="grupo">
          <button
            type="button"
            className="boton eliminar"
            onClick={() => {
              args.eliminar(args.index);
            }}
          >
            <span>Eliminar</span>
          </button>

          <button
            type="button"
            className="boton editar"
            onClick={() => {
              args.editar(args.index);
            }}
          >
            Editar
          </button>
        </div>
      </p>
    </div>
  );
}