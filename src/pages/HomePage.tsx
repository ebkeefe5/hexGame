import { Link  } from 'react-router-dom';

export default function HomePage() {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <div>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "48px",
          display: "flex",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <Link
          to="/oneplayer"
          style={{
            padding: "36px 40px",
            fontSize: "1.8rem",
            background: "#A9A9A9",
            color: "black",
            textDecoration: "none",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          One Player
        </Link>

        <Link
          to="/twoplayer"
          style={{
            padding: "36px 40px",
            fontSize: "1.8rem",
            background: "#F0F0F0",
            color: "black",
            textDecoration: "none",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          Two Player
        </Link>
      </div>

      <div
        style={{
          margin: "0 auto",
          width: "60%",
          minWidth: "360px",
          color: "#333",
        }}
      >
        <p>
          Hex is an alternating turn board game. Red has the first move, but may not move in the center on the first turn.
          Red wins by connecting the bottom and top of the board with an unbroken chain of red hexagons. Blue wins by
          connecting the left and right side of the board with an unbroken chain of blue hexagons.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: "24px", marginTop: "48px", }}>
            <img
              src={`${publicUrl}/images/winningRedBoard.PNG`}
              alt="Example of a red winning board"
              style={{ width: "30%", height: "auto" }}
            />
            <img
              src={`${publicUrl}/images/winningBlueBoard.PNG`}
              alt="Example of a blue winning board"
              style={{ width: "30%", height: "auto" }}
            />
          </div>
      </div>
    </div>
  );
}
