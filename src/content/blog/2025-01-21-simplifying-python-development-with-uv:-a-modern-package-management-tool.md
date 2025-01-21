---
publishedAt: 2025-01-21
title: "Simplifying Python Development with uv: A Modern Package Management Tool"
summary: uv is a blazingly fast Python package manager that simplifies dependency management and virtual environment workflows through modern tooling written in Rust.
cover: https://images.unsplash.com/photo-1605882174146-a464b70cf691?q=80&w=1400&h=600&fit=crop
tags:
  - python
  - packagemanager
  - uv
  - devtools
  - virtualenv
  - dependency-management
  - rust
  - python-development
  - fastapi
  - development-tools
  - pip
  - package-installer
---

For developers transitioning from JavaScript/TypeScript to Python or those seeking to optimize their development workflow, `uv` represents a groundbreaking advancement in package management. As a modern alternative to traditional package managers, this Rust-based tool offers exceptional speed and reliability for Python package installation and dependency resolution.

## What Makes uv a Game-Changing Package Manager?

`uv` stands out in the Python packaging ecosystem by addressing common pain points in virtual environment management and package installation. For developers familiar with `npm` and yarn from the JavaScript world, `uv` brings similar modern development workflows to Python while delivering unprecedented performance capabilities.

### Lightning-Fast Package Installation

Coming from the Node.js ecosystem, you'll immediately notice `uv` remarkable speed:

- Performs up to 20x faster than traditional package managers like `pip` ([Benchmarks](https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md))
- Leverages parallel processing for complex dependency trees
- Optimizes performance with both cold cache and warm cache installations
- Minimizes redundant memory allocations during package resolution

### Advanced Dependency Resolution

`uv` excels at handling complex dependency management scenarios:

- Creates Universal Lockfiles (similar to `package-lock.json` in `npm`)
- Supports both direct and transitive dependencies
- Handles dependency markers and version-specific dependencies
- Provides consistent environments across different platforms

### Streamlined Virtual Environment Management

Virtual environment integration in `uv` simplifies project isolation:

```bash
# Create a new virtual environment
uv venv

# Activate on Unix
source .venv/bin/activate

# Activate on Windows
.venv\Scripts\activate
```

### Project Management Features

`uv` consolidates essential features for modern Python development:

- Unified functionality for package installation and environment management
- Support for editable installs during development
- Integration with existing configuration files
- Handling of URL dependencies and custom indexes

## Getting Started with uv: A TypeScript Developer's Guide

For developers with a JavaScript/TypeScript background, `uv` offers familiar concepts with Python-specific advantages. This blog will guide you through using `uv` by drawing parallels to tools and workflows you already know from the JavaScript/TypeScript ecosystem.

Let's start by installing `uv` into our system. This can be done with their standalone installer. For more information you can check their [official docs](https://docs.astral.sh/uv/#getting-started).

```bash
# Unix
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Project Management

`uv` follows modern package manager conventions, similar to `npm` or `yarn`. It introduces a streamlined workflow for creating new projects, managing dependencies, and maintaining `lockfiles`. This approach reduces the cognitive load when switching between different programming ecosystems.

```bash
# Bootstrap new project
uv init my-project
cd my-project

# Add dependencies
uv add fastapi
uv add --dev pytest ruff

# Create/update lockfile
uv lock

# Sync project dependencies
uv sync
```

### Python Version Management

Managing Python versions has traditionally been a pain point for developers. `uv` simplifies this process by providing built-in commands to install, manage, and switch between Python versions. This is particularly useful when working on multiple projects that require different Python versions.

```bash
# Install specific Python version
uv python install 3.11

# List available versions
uv python list

# Pin project to specific version
uv python pin 3.11
```

For developers familiar with `nvm` (Node Version Manager), `uv` offers a similar experience for managing Python versions, making it easy to install, list, and switch between different versions.

### Script Management

For developers working with standalone scripts, `uv` provides a convenient way to manage dependencies at the script level. This is perfect for small utilities, automation scripts, or quick prototypes that don't require a full project setup.

```bash
# Add dependency to a script
uv add --script requests example.py

# Run script with dependencies
uv run example.py
```

### Tool Management with uvx

The `uvx` command provides a powerful way to run Python tools without installing them permanently or affecting your project's dependencies. This isolated execution environment is similar to `npx` in the Node.js ecosystem, making it ideal for running linters, formatters, and other development tools.

```bash
# Run tools directly
uvx ruff check .
uvx black .

# Or install tools user-wide
uv tool install ruff
uv tool install black
```

### Virtual Environments and Legacy Support

While `uv` introduces modern workflows, it maintains strong compatibility with traditional Python development practices. This backward compatibility ensures you can gradually adopt `uv`'s features while working with existing projects and workflows.

```bash
# Create virtual environment
uv venv

# Install from requirements
uv pip install -r requirements.txt

# Generate requirements
uv pip freeze > requirements.txt

# View dependency tree
uv pip tree
```

## Transitioning from JavaScript/TypeScript

For developers with JavaScript/TypeScript experience, `uv` provides a familiar command structure. This section maps common Node.js commands to their `uv` equivalents, making the transition to Python development more intuitive.

| Action                          | npm                     | Yarn                  | uv                     |
| ------------------------------- | ----------------------- | --------------------- | ---------------------- |
| Initialize project              | `npm init`              | `yarn init`           | `uv init`              |
| Add dependency                  | `npm install package`   | `yarn add package`    | `uv add package`       |
| Remove dependency               | `npm uninstall package` | `yarn remove package` | `uv remove package`    |
| Install/Update all dependencies | `npm install`           | `yarn install`        | `uv sync`              |
| Lock dependencies               | `npm shrinkwrap`        | `yarn lock`           | `uv lock`              |
| View dependency tree            | `npm list`              | `yarn list`           | `uv tree`              |
| Run script/command              | `npm run script`        | `yarn run script`     | `uv run script`        |
| Execute tool                    | `npx command`           | `yarn dlx command`    | `uvx` or `uv tool run` |

## Hands-on Demo: Building a FastAPI Project

Let's walk through creating a complete project using `uv`, similar to creating a new `express.js` project in the Node.js world. We'll build a simple API using [FastAPI](https://fastapi.tiangolo.com/).

In case you want to jump directly into the code and test it directly, all the source code is live on [GitHub](https://github.com/EmaSuriano/fastapi-uv-demo.git).

![FastAPI uv demo preview](https://opengraph.githubassets.com/EmaSuriano/EmaSuriano/fastapi-uv-demo)

### 1. Project Initialization

First, let's create a new project:

```bash
# Create and initialize project
uv init fastapi-uv-demo

cd fastapi-uv-demo
```

After initialization, your project structure will look like this:

```plain
fastapi-uv-demo/
├── pyproject.toml      # Project configuration
├── .python-version     # Store the python version to run the project
├── README.md           # Project documentation
└── hello.py            # Starting file with Hello world example
```

The current project configuration is as follows:

```toml
[project]
name = "fastapi-uv-demo"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.10"
dependencies = []
```

Before adding new dependencies we need to create a new virtual environment and activate it:

```bash
# Create and activate virtual environment
uv venv

source .venv/bin/activate  # On Unix
# or
.venv\Scripts\activate     # On Windows
```

### 2. Setting Up Dependencies

Create a `requirements.in` file (similar to package.json):

```bash
# Add production dependencies
uv add fastapi 'uvicorn[standard]' pydantic
```

```bash
# Add development dependencies
uv add --dev pytest black ruff mypy httpx
```

Our project configuration should look like:

```toml
[project]
name = "fastapi-uv-demo"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "fastapi>=0.115.6",
    "pydantic>=2.10.5",
    "uvicorn[standard]>=0.34.0",
]

[dependency-groups]
dev = [
    "black>=24.10.0",
    "mypy>=1.14.1",
    "pytest>=8.3.4",
    "httpx>=0.28.1",
    "ruff>=0.9.2",
]


```

Also you might notice that a new file has been created in your repository called `uv.lock`, this is serves the same pourpose as `yarn.lock` or `package-lock.json` which is to guarantee exact same version of every package on installation.

### 3. Creating the API

Let's create a new folder `src` to store the files of our project and a new file called `main.py` with the code for our FastAPI server:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

# Root endpoint
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Item endpoint
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# Create item endpoint
@app.post("/items/")
def create_item(item: Item):
    return item
```

### 4. Running the Application

Start the server using uvicorn:

```bash
uv run uvicorn src.main:app --reload
```

Your API is now running at `http://localhost:8000`. You can access:

- API documentation at `http://localhost:8000/docs`
- Root endpoint at `http://localhost:8000/`
- Items endpoint at `http://localhost:8000/items/{id}`

Let's not forget about the tests as well! Let's add another file called `main_test.py` with the following code:

```python
from fastapi.testclient import TestClient
from main import app

# Create a test client
client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}


def test_get_item():
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1}


def test_create_item():
    test_item = {"name": "Test Item", "price": 10.5, "is_offer": True}
    response = client.post("/items/", json=test_item)
    assert response.status_code == 200
    assert response.json() == test_item

```

### 5. Running tools

You can also run development tools directly using `uvx`:

```bash
# Run type checking
uvx mypy src/

# Format code
uvx black main.py

# Run linter
uvx ruff check main.py

# Run tests
uvx pytest

# Build the project
uv build
```

Because we also have this tools installed as development dependencies, they can also be executed with `uv run`.

### 6. Setting Up CI/CD with GitHub Actions

Let's finish our pet project setting up a nice pipeline with Github Actions so we are sure that we don't break any of our code between commits.

Create a new file `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push]

jobs:
  test:
    name: Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install uv and set Python version
        uses: astral-sh/setup-uv@v5
        with:
          enable-cache: true
          cache-dependency-glob: "uv.lock"

      - name: Install dependencies
        run: uv sync --all-extras --dev

      - name: Type check with mypy
        run: uv run mypy src/

      - name: Lint with Ruff
        run: uv run ruff check src/

      - name: Format check with Black
        run: uv run black src/ --check

      - name: Run tests
        run: uv run pytest

      - name: Build package
        run: uv build
```

This CI/CD pipeline follows `uv`'s official best practices:

- Uses the official `astral-sh/setup-uv` action for reliable Python and uv setup
- Enables caching with proper `cache-dependency-glob: "uv.lock"` for faster builds
- Respects project's Python version from `.python-version` file
- Uses `uv sync --all-extras --dev` for complete dependency installation
- Runs commands with `uv run` in the project environment (like `uv run pytest`)
- Performs code quality checks:
  - Type checking with MyPy
  - Linting with Ruff
  - Formatting with Black
  - Package building with uv build

## Closing words

For Python developers, especially those with JavaScript/TypeScript experience, `uv` provides a comprehensive solution that bridges the gap between modern package management expectations and Python's traditional tooling. Its focus on performance, reliability, and developer experience makes it an essential tool for modern Python development.

For me, it changed completely the way I work with Python. Working with different projects used to quite messy because each one was requiring different dependencies and I had to decipher what kind of tool I was required to use, how do I keep up with my installed packages, etc. Having one tool to manage everything makes the whole workflow much better!

Hope this will help others like, and thanks for reading.
