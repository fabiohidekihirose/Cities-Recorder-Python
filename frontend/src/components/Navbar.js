import "../styles/Navbar.css";

export default function Navbar({ setCurrentView, setComments, setWannaVisit }) {
  const clickHandler = async (button) => {
    if (button === "favorite") {
      setCurrentView("favorite-cities");
    } else if (button === "wanna-visit") {
      const wannaVisitData = await fetch("http://localhost:8000/wannaVisit");
      const wannaVisit = await wannaVisitData.json();
      setWannaVisit(wannaVisit);
      setCurrentView("wanna-visit");
    }
  };

  return (
    <nav>
      <button onClick={() => clickHandler("favorite")}>
        Show Favorite Cities
      </button>
      <button onClick={() => clickHandler("wanna-visit")}>Wanna Visit</button>
    </nav>
  );
}
