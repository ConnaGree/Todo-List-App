import "./App.css";
import EditModal from "./components/EditModal";
import FocusTimer from "./components/FocusTimer";
import TaskContentContainer from "./components/TaskContentContainer";
import TaskInputSection from "./components/TaskInputSection";
import TaskProvider from "./TaskContext";

function App() {
  return (
    <TaskProvider>
      <main className="app-shell">
        <section className="page-header">
          <div className="hero-card glass-panel">
            <p className="eyebrow">Plan • Prioritize • Focus</p>
            <h1>Modern task board for ambitious days</h1>
            <p className="hero-copy">
              Collect tasks, assign priority, set due dates, and carve out
              intentional focus blocks with the built-in timer.
            </p>
            <div className="hero-tags">
              <span>Smart priorities</span>
              <span>Drag & drop</span>
              <span>Local autosave</span>
            </div>
          </div>
          <FocusTimer />
        </section>

        <section className="tasks-panel glass-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Task Board</p>
              <h2>Stay on top of what matters</h2>
            </div>
            <span className="status-chip idle">Drag to reorder</span>
          </div>
          <TaskInputSection />
          <div className="tasks__container">
            <TaskContentContainer />
          </div>
        </section>
        <EditModal />
      </main>
    </TaskProvider>
  );
}

export default App;
