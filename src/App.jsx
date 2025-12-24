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
        <header className="page-header">
          <div className="hero-card">
            <h1>Todo_Brutal</h1>
            <p className="eyebrow">v1.0.0 // SYSTEM_READY</p>
          </div>
          <div className="hero-tags">
            <span>#STRICT_MODE</span>
            <span>#NO_BS</span>
          </div>
        </header>

        <aside className="left-panel">
          <FocusTimer />
          <div style={{ marginTop: '2rem' }}>
             <p className="hero-copy">
              Collect tasks. Assign priority. 
              Execute with extreme prejudice.
            </p>
          </div>
        </aside>

        <section className="tasks-panel">
          <div className="section-heading">
            <h2>Task_Log</h2>
            <span className="status-chip active">STATUS: ONLINE</span>
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
