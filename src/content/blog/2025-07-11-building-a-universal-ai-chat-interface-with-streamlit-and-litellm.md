---
publishedAt: 2025-07-11
title: "Building a Universal AI Chat Interface with Streamlit and LiteLLM"
summary: Creating a flexible AI chat application that works with 100+ language models from different providers using Streamlit's interactive interface and LiteLLM's unified API abstraction.

cover: https://images.unsplash.com/uploads/1413222992504f1b734a6/1928e537?w=1400&h=600&fit=crop
tags:
  - streamlit
  - litellm
  - ai
  - chatbot
  - python
  - llm
  - api
  - interface
  - machine-learning
  - openai
  - anthropic
  - google
  - ollama
---

As AI models become increasingly diverse and powerful, developers often face the challenge of working with different APIs and providers. Each has unique interfaces, authentication methods, and response formats. What if we could create a single application that works seamlessly with OpenAI's GPT models, Anthropic's Claude, Google's Gemini, local Ollama models, and dozens of others?

In this post, I'll walk you through building a universal AI chat interface using [Streamlit](https://streamlit.io/) and [LiteLLM](https://litellm.ai/) that solves exactly this problem.

## The Technologies Behind the Solution

### Streamlit: Rapid Web App Development

Streamlit is a Python framework that transforms data scripts into shareable web applications in minutes. What makes Streamlit particularly powerful for AI applications is its reactive nature - when users interact with widgets, the entire app reruns, making it perfect for conversational interfaces.

Key advantages for our use case:

- **Zero frontend complexity**: Pure Python with automatic UI generation
- **Built-in chat components**: Native support for chat interfaces with `st.chat_message()` and `st.chat_input()`
- **Session state management**: Persistent data across interactions for maintaining conversation history
- **Real-time updates**: Automatic rerendering when state changes
- **Easy deployment**: One-click deployment to [Streamlit Cloud](https://streamlit.io/cloud)

### LiteLLM: The Universal LLM Gateway

LiteLLM acts as a translation layer between your application and 100+ language models from different providers. Instead of learning multiple APIs, you write code once and it works everywhere.

Core benefits:

- **Unified interface**: Same function calls work with OpenAI, Anthropic, Google, Cohere, and many others
- **Automatic format conversion**: Handles different request/response formats internally
- **Provider abstraction**: Switch models without changing code
- **Error standardization**: Consistent error handling across providers
- **Cost tracking**: Built-in usage monitoring and cost calculation

### Architecture Overview

The application follows a simple but effective architecture:

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Streamlit UI  │ -> │   LiteLLM    │ -> │  AI Providers   │
│                 │    │   Gateway    │    │ (OpenAI, etc.)  │
│ - Chat Input    │    │              │    │                 │
│ - Model Config  │    │ - API Trans  │    │ - GPT Models    │
│ - Message History│   │ - Error Hand │    │ - Claude Models │
│ - Settings      │    │ - Format Conv│    │ - Gemini Models │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

## Implementation Deep Dive

Let's explore the key components of our application:

### 1. Application Configuration and Session State

```python
import streamlit as st
import litellm
from typing import List, Dict
from datetime import datetime

# Configure the page
st.set_page_config(
    page_title="AI Chat Assistant",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = []
if "model" not in st.session_state:
    st.session_state.model = "github/Phi-4"
if "api_key" not in st.session_state:
    st.session_state.api_key = st.secrets["api_key"]
```

Streamlit's session state mechanism ensures that conversation history and configuration persist across interactions. This is crucial for maintaining context in a chat application.

### 2. Universal AI Response Handler

```python
def get_ai_response(messages: List[Dict[str, str]], model: str, api_key: str) -> str:
    """Get response from the AI model using LiteLLM."""
    try:
        response = litellm.completion(
            model=model,
            messages=messages,
            api_key=api_key,
            temperature=0.7,
            max_tokens=1000,
        )

        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"
```

This single function works with any LiteLLM-supported model. Whether you're calling OpenAI's `gpt-4`, Anthropic's `claude-3-sonnet-20240229`, or Google's `gemini-pro`, the interface remains identical.

### 3. Dynamic Model Configuration Interface

```python
# Sidebar for configuration
with st.sidebar:
    st.header("⚙️ Configuration")

    # Model input - free text field
    model_input = st.text_input(
        "Model Name:",
        value=st.session_state.model,
        placeholder="e.g., gpt-3.5-turbo, claude-3-sonnet-20240229, gemini-pro",
        help="Enter any model supported by LiteLLM",
    )

    # API Key input
    api_key = st.text_input(
        "API Key:",
        type="password",
        value=st.session_state.api_key,
        help="Enter your API key for the model provider",
    )
```

The flexible text input allows users to specify any model name that LiteLLM supports, making the application truly universal. The sidebar also includes helpful model suggestions organized by provider.

### 4. Real-time Chat Interface

```python
# Chat input
if prompt := st.chat_input("Type your message here..."):
    # Add user message to chat history
    timestamp = datetime.now().strftime("%H:%M:%S")
    user_message = {"role": "user", "content": prompt, "timestamp": timestamp}
    st.session_state.messages.append(user_message)

    # Display user message
    with st.chat_message("user"):
        st.markdown(prompt)
        st.caption(f"🕐 {timestamp}")

    # Get AI response
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            # Prepare messages for API (without timestamps)
            api_messages = [
                {"role": msg["role"], "content": msg["content"]}
                for msg in st.session_state.messages
            ]

            response = get_ai_response(
                api_messages, st.session_state.model, st.session_state.api_key
            )

            st.markdown(response)
            response_timestamp = datetime.now().strftime("%H:%M:%S")
            st.caption(f"🕐 {response_timestamp}")

    # Add assistant response to chat history
    assistant_message = {
        "role": "assistant",
        "content": response,
        "timestamp": response_timestamp,
    }
    st.session_state.messages.append(assistant_message)
```

The chat interface leverages Streamlit's native chat components for a polished user experience. Messages include timestamps and the conversation maintains context across the entire session.

### Local Development Setup

Getting the application running locally is straightforward:

```bash
# Clone the repository
git clone https://github.com/EmaSuriano/streamlit-litellm-demo.git
cd streamlit-litellm-demo

# Install dependencies using uv
uv sync

# Run the Streamlit application
uv run streamlit run streamlit_app.py
```

The application will be available at `http://localhost:8501` with a clean, responsive interface that works across different devices.

## Supported Models and Providers

One of the most powerful aspects of this implementation is its extensive model support through LiteLLM:

### OpenAI Models

- `gpt-3.5-turbo` - Fast and cost-effective for most conversations
- `gpt-4` - Enhanced reasoning and complex task handling
- `gpt-4-turbo` - Latest improvements with larger context windows

### Anthropic Models

- `claude-3-sonnet-20240229` - Balanced performance and speed
- `claude-3-haiku-20240307` - Ultra-fast responses for simple tasks
- `claude-3-opus-20240229` - Maximum capability for complex reasoning

### Google Models

- `gemini-pro` - Google's flagship conversational AI
- `gemini-1.5-pro` - Enhanced with larger context understanding

### Local and Open Source

- `ollama/llama2` - Run models locally with Ollama
- `together_ai/togethercomputer/llama-2-70b-chat` - Hosted open models
- `replicate/meta/llama-2-70b-chat` - Alternative hosting options

## Live Demo and Deployment

The application is deployed and accessible at: [Streamlit LiteLLM Demo](https://emasuriano-litellm-demo.streamlit.app/)

[Streamlit Cloud](https://streamlit.io/cloud) deployment is remarkably simple:

1. Connect your GitHub repository to Streamlit Cloud
2. Configure any necessary secrets (API keys)
3. Automatic deployment on every push to main branch

The cloud deployment includes proper secret management, ensuring API keys are never exposed in the code while remaining accessible to the application.

## Key Features and User Experience

- **Dynamic Model Switching**: Users can change models on-the-fly without losing conversation history, enabling comparison of responses from different providers for the same prompt.
- **Privacy-First Design**: API keys are securely handled, stored only in the browser session, and transmitted solely to the intended AI provider.
- **Comprehensive Error Handling**: LiteLLM's standardized error responses provide helpful feedback regardless of provider issues.
- **Real-time Statistics**: The sidebar displays conversation metrics and model status, allowing users to track usage and confirm proper configuration.

## Practical Applications

This universal interface pattern proves valuable in numerous scenarios:

- **Model Comparison**: Compare outputs from different models using identical prompts.
- **Prototyping**: Test models and prompts before committing to providers.
- **Education**: Experiment with language models without complex APIs.
- **Business Use**: Evaluate AI providers for cost, quality, and performance.

## Conclusion

Building a universal AI chat interface with Streamlit and LiteLLM demonstrates how modern Python tools can rapidly create sophisticated applications. The combination of Streamlit's intuitive UI framework and LiteLLM's provider abstraction enables developers to focus on user experience rather than API integration complexity.

This project showcases the power of choosing the right abstractions - by leveraging these two libraries, we've created an application that works with over 100 AI models while maintaining clean, readable code.

The complete source code is available on [GitHub](https://github.com/EmaSuriano/streamlit-litellm-demo), and you can try the live demo at [Streamlit LiteLLM Demo](https://emasuriano-litellm-demo.streamlit.app/). Whether you're exploring different AI models, building prototypes, or creating production applications, this foundation provides a solid starting point for AI-powered interfaces.
