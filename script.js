const input = document.getElementById("userInput");
const chatContainer = document.getElementById("chatContainer");
const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");
const quickQuestions = document.getElementById("quickQuestions");

const DEFAULT_MODEL = "v3";


// =====================================================
// ENTER TO SEND
// =====================================================

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }
});


// =====================================================
// AUTO RESIZE TEXTAREA
// =====================================================

input.addEventListener("input", function () {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 130) + "px";
});


// =====================================================
// SEND MESSAGE
// =====================================================

async function sendMessage() {

    const message = input.value.trim();

    if (!message) {
        return;
    }

    addUserMessage(message);

    input.value = "";
    input.style.height = "auto";

    welcome.style.display = "none";
    quickQuestions.style.display = "none";

    showTyping();

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                version: DEFAULT_MODEL

            })
        });


        const data = await response.json();

        hideTyping();


        if (data.success) {

            addBotMessage(
                data.response,
                data.confidence
            );

            console.log(
                "Intent:",
                data.intent
            );

            console.log(
                "Confidence:",
                data.confidence
            );

            console.log(
                "Model:",
                data.model_version
            );

        } else {

            addBotMessage(
                data.response ||
                "Something went wrong.",
                null
            );
        }


    } catch (error) {

        hideTyping();

        console.error(
            "Connection Error:",
            error
        );

        addBotMessage(
            "Server se connection nahi ho pa raha. Please check whether Flask is running.",
            null
        );
    }
}


// =====================================================
// QUICK MESSAGE
// =====================================================

function quickMessage(message) {

    input.value = message;

    sendMessage();
}


// =====================================================
// ADD USER MESSAGE
// =====================================================

function addUserMessage(message) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message user";

    wrapper.innerHTML = `

        <div class="bubble">

            ${escapeHTML(message)}

            <div class="message-meta">
                Just now
            </div>

        </div>

        <div class="avatar">
            👤
        </div>

    `;

    chatContainer.appendChild(wrapper);

    scrollToBottom();
}


// =====================================================
// ADD BOT MESSAGE
// =====================================================

function addBotMessage(
    message,
    confidence = null
) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message bot";


    let confidenceHTML = "";

    if (confidence !== null) {

        confidenceHTML = `

            <div class="confidence">
                ✓ Confidence ${confidence}%
            </div>

        `;
    }


    wrapper.innerHTML = `

        <div class="avatar">
            🤖
        </div>

        <div>

            <div class="bubble">

                ${formatMessage(message)}

                ${confidenceHTML}

            </div>

            <div class="message-meta">
                College AI • Just now
            </div>

        </div>

    `;


    chatContainer.appendChild(wrapper);

    scrollToBottom();
}


// =====================================================
// TYPING INDICATOR
// =====================================================

function showTyping() {

    const typing =
        document.createElement("div");

    typing.className =
        "typing";

    typing.id =
        "typingIndicator";


    typing.innerHTML = `

        <div class="avatar">
            🤖
        </div>

        <div class="typing-bubble">

            <div class="typing-dot"></div>

            <div class="typing-dot"></div>

            <div class="typing-dot"></div>

        </div>

    `;


    chatContainer.appendChild(typing);

    scrollToBottom();
}


// =====================================================
// HIDE TYPING
// =====================================================

function hideTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );

    if (typing) {
        typing.remove();
    }
}


// =====================================================
// NEW CHAT
// =====================================================

function newChat() {

    const messages =
        chatContainer.querySelectorAll(
            ".message, .typing"
        );


    messages.forEach(
        message => message.remove()
    );


    welcome.style.display =
        "block";

    quickQuestions.style.display =
        "grid";


    input.value = "";

    input.style.height =
        "auto";


    chat.scrollTop = 0;

    closeSidebar();
}


// =====================================================
// MOBILE SIDEBAR
// =====================================================

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    sidebar.classList.toggle(
        "active"
    );

    overlay.classList.toggle(
        "active"
    );
}


// =====================================================
// CLOSE SIDEBAR
// =====================================================

function closeSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    sidebar.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );
}


// =====================================================
// SCROLL TO BOTTOM
// =====================================================

function scrollToBottom() {

    setTimeout(() => {

        chat.scrollTo({

            top: chat.scrollHeight,

            behavior: "smooth"

        });

    }, 50);
}


// =====================================================
// FORMAT MESSAGE
// =====================================================

function formatMessage(message) {

    return escapeHTML(
        message
    ).replace(
        /\n/g,
        "<br>"
    );
}


// =====================================================
// SECURITY
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


// =====================================================
// HISTORY BUTTONS
// =====================================================

document
    .querySelectorAll(".history-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const text =
                    this.innerText
                        .replace(
                            /^[^\w]+/,
                            ""
                        )
                        .trim();

                input.value =
                    text;

                input.focus();

                closeSidebar();
            }
        );

    });