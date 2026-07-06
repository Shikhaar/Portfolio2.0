# Democratic Software Factory: Project Overview & System Architecture

Welcome to the **Democratic Software Factory** (also known as *Idea*). This document serves as the absolute source of truth for the project's technical architecture, tech stack, tools, directory layout, memory systems, governance model, and current state.

---

## 1. Project Vision
An **Autonomous AI Engineering Organization as a Service** — give it a prompt, and it plans, builds, tests, and deploys full-stack applications. Rather than allowing conversational multi-agent loops to hallucinate, this system enforces reality through a deterministic state machine, strict hierarchical roles, and a contract-first approach.

---

## 2. Technology Stack & Tools

### Backend (Core Execution & Orchestration)
*   **Language:** Python 3.11+
*   **Dependency Management:** [Poetry](https://python-poetry.org/)
*   **Web Framework:** FastAPI (async REST endpoints, WebSockets for logs and events)
*   **Production Server:** Uvicorn
*   **Database ORM:** SQLAlchemy (supporting SQLite in development / PostgreSQL in production)
*   **Database Migrations:** Alembic
*   **LLM Interface:** LiteLLM (unified interface to OpenAI, Anthropic, Gemini) + Instructor (strict Pydantic schema validation & retries)
*   **Vector Database:** Qdrant (for agent RAG/long-term memory)
*   **Observability:** Weights & Biases (Weave tracing) + standard system files logging (`src/factory/logs/app.log`)

### Frontend (Dashboard & Visual Studio)
*   **Framework:** React / Next.js / Vite
*   **Styling:** Custom Vanilla CSS for rich glassmorphism aesthetics and premium dark mode
*   **Interactive Graphs:** React Flow (`@xyflow/react`) for read-only workflow execution visualization
*   **Web IDE:** Monaco Editor (lazy-loaded for streaming/viewing files in the web UI)
*   **Communications:** WebSockets (idempotent delta updates for file tree/logs streaming)

---

## 3. Directory Structure

```text
├── .env.example          # Template for required environment variables
├── pyproject.toml        # Poetry packaging and dependency definitions
├── README.md             # Standard starter guide
├── COMMANDS.md           # CLI & execution commands reference
├── docker-compose.yml    # Vector DB (Qdrant) and auxiliary infrastructure
├── src/
│   └── factory/
│       ├── agents/       # Agent role templates & system prompts
│       ├── cli/          # "idea" CLI tools (new project, YAML workflow executor)
│       ├── core/         # Core registries, sandboxing, & tool executors
│       ├── db/           # Session management and database engine configs
│       ├── execution/    # Execution context schemas & history mapping
│       ├── llm/          # LLM API providers & prompt engineering setups
│       ├── models/       # SQLAlchemy models (WorkflowStep, Individual, etc.)
│       ├── orchestration/# WorkflowManager, schedulers, and DAG engine
│       ├── runtime/      # AgentExecutor (the core ReAct run loop)
│       ├── server/       # FastAPI application and route endpoints
│       └── tools/        # Native agent tools (file reads/writes, CLI runs, HITL)
├── web/                  # React / Next.js frontend code
├── docs/                 # Documentation directory (architecture, walkthroughs, plans)
└── tests/                # Verification scripts and test suites
```

---

## 4. Logical Control Flow & Architecture

The factory behaves like a structured operating system for AI workers, divided into decoupled layers:

```text
                     ┌──────────────────────────┐
                     │       CPO Council        │
                     │ Strategy / Arbitration   │
                     └────────────┬─────────────┘
                                  │
                                  ▼
                      ┌────────────────────┐
                      │ Governance Engine  │
                      │ Drift Detection    │
                      │ Conflict Resolver  │
                      └─────────┬──────────┘
                                  │
                                  ▼
                 ┌───────────────────────────┐
                 │      Workflow Engine      │
                 │        DAG Runtime        │
                 └────────────┬──────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │     AgentExecutor    │
                   │ LLM Loop + Tools     │
                   └─────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   Memory Layer         Plugin System        Event Bus
  (Vector + Store)     (Tool Registry)      (System Events)
```

### 4.1. Orchestration Layer (`WorkflowManager`)
*   Generates a Directed Acyclic Graph (DAG) for step execution.
*   Enforces immutable execution: once a workflow starts, it is executed based on a frozen `plan_snapshot` representing the exact system settings (agents, tools, step configurations) to prevent live configuration drift.

### 4.2. Runtime Layer (`AgentExecutor`)
*   Controls the ReAct loop: **LLM** ➔ **Tool Call** ➔ **Result** ➔ **LLM**.
*   Limits cost and infinite loops through:
    *   **Soft Warning Limit (80%):** Warns the agent to summarize and conclude the task immediately.
    *   **Hard Circuit Breaker (100%):** Terminates execution immediately when the turn or token count exceeds maximum thresholds.

### 4.3. Governance Engine
*   Checks for *Strategy Drift* (Layer 1 fast heuristic validation + Layer 2 strategic LLM evaluation).
*   Catches tool failures and dynamically triggers fallback workarounds.
*   Enforces human-in-the-loop (HITL) execution through `ask_user` prompts, pausing execution safely in the database until input is received.

---

## 5. Agent Tools & Memory Systems

### Active Tools
*   **Filesystem Tools:** `read_file`, `write_file`, `list_dir` (confined to sandboxed paths).
*   **Execution Tools:** `run_command` (limited CLI runner).
*   **Communication Tools:** `ask_user` (HITL suspension) and slack notification bridges.
*   **n8n Tool Bridge:** Deployed integrations automatically register as native tools, making them dynamically assignable to agent definitions.

### Memory Architecture
1.  **Short-Term Memory:** Stored in the `ExecutionContext` object, persisting across steps *only within the current execution*.
2.  **Long-Term Memory:** Powered by Qdrant. Agents search and retrieve documents, code fragments, and past context.

---

## 6. Recent Upgrades (Up-To-Date)
*   **Fully Frozen Snapshots:** The system serializes and executes from `plan_snapshot` on boot.
*   **ExecutionContext Integration:** Standardized container passing state across steps.
*   **Strict UI Layouts:** Frontend gates CPO creation and role management.
*   **Token Budget Limits:** Added a circuit breaker to the `AgentExecutor` to halt executions before budget leaks occur.
