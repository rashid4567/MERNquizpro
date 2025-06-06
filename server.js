const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mern-quiz-secret-key-2024",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  }),
)

// Set EJS as template engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Quiz Questions Database
const quizQuestions = [
  {
    id: 1,
    question: "What does MERN stand for?",
    options: [
      "MongoDB, Express, React, Node.js",
      "MySQL, Express, React, Node.js",
      "MongoDB, Express, Redux, Node.js",
      "MongoDB, Express, React, Next.js",
    ],
    correct: 0,
    category: "General",
    explanation:
      "MERN is an acronym for MongoDB, Express.js, React, and Node.js - the four key technologies that make up this full-stack development framework.",
  },
  {
    id: 2,
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correct: 2,
    category: "MongoDB",
    explanation: "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents.",
  },
  {
    id: 3,
    question: "Express.js is a framework for which technology?",
    options: ["React", "Node.js", "MongoDB", "Angular"],
    correct: 1,
    category: "Express",
    explanation:
      "Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.",
  },
  {
    id: 4,
    question: "What is JSX in React?",
    options: ["A database query language", "A syntax extension for JavaScript", "A CSS framework", "A Node.js module"],
    correct: 1,
    category: "React",
    explanation:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
  },
  {
    id: 5,
    question: "Which method is used to create a server in Node.js?",
    options: ["http.createServer()", "server.create()", "node.createServer()", "express.server()"],
    correct: 0,
    category: "Node.js",
    explanation:
      "The http.createServer() method is used to create an HTTP server in Node.js that listens to server ports and gives a response back to the client.",
  },
  {
    id: 6,
    question: "What is the default port for MongoDB?",
    options: ["3000", "5000", "27017", "8080"],
    correct: 2,
    category: "MongoDB",
    explanation: "MongoDB runs on port 27017 by default. This is the standard port for MongoDB database connections.",
  },
  {
    id: 7,
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: 1,
    category: "React",
    explanation:
      "useEffect is the React hook used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
  },
  {
    id: 8,
    question: "What is middleware in Express.js?",
    options: [
      "A database connection",
      "Functions that execute during request-response cycle",
      "A React component",
      "A MongoDB collection",
    ],
    correct: 1,
    category: "Express",
    explanation:
      "Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application's request-response cycle.",
  },
  {
    id: 9,
    question: "Which command is used to initialize a new Node.js project?",
    options: ["node init", "npm start", "npm init", "node create"],
    correct: 2,
    category: "Node.js",
    explanation: "The 'npm init' command is used to create a package.json file and initialize a new Node.js project.",
  },
  {
    id: 10,
    question: "What does npm stand for?",
    options: ["Node Package Manager", "New Project Manager", "Node Program Manager", "Network Package Manager"],
    correct: 0,
    category: "Node.js",
    explanation:
      "npm stands for Node Package Manager. It's the default package manager for Node.js and is used to install and manage packages.",
  },
  {
    id: 11,
    question: "In React, what is the purpose of the 'key' prop?",
    options: [
      "To encrypt data",
      "To help React identify which items have changed",
      "To create unique IDs",
      "To access component methods",
    ],
    correct: 1,
    category: "React",
    explanation:
      "The 'key' prop helps React identify which items have changed, are added, or are removed, making the rendering process more efficient.",
  },
  {
    id: 12,
    question: "Which HTTP method is typically used to create new resources?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correct: 1,
    category: "Express",
    explanation:
      "POST is typically used to create new resources on the server. It sends data to the server to create a new resource.",
  },
  {
    id: 13,
    question: "What is a collection in MongoDB?",
    options: ["A group of databases", "A group of documents", "A single document", "A database connection"],
    correct: 1,
    category: "MongoDB",
    explanation: "A collection in MongoDB is a group of documents. It's equivalent to a table in relational databases.",
  },
  {
    id: 14,
    question: "Which of the following is NOT a valid React component lifecycle method?",
    options: ["componentDidMount", "componentWillUnmount", "componentDidUpdate", "componentWillRender"],
    correct: 3,
    category: "React",
    explanation: "componentWillRender is not a valid React lifecycle method. The correct method is componentDidUpdate.",
  },
  {
    id: 15,
    question: "What is the purpose of package.json in a Node.js project?",
    options: [
      "To store application data",
      "To define project metadata and dependencies",
      "To configure the database",
      "To handle HTTP requests",
    ],
    correct: 1,
    category: "Node.js",
    explanation:
      "package.json contains metadata about the project and lists the dependencies that the project needs to run.",
  },
  {
    id: 16,
    question: "What is the virtual DOM in React?",
    options: [
      "A real DOM element",
      "A JavaScript representation of the real DOM",
      "A CSS framework",
      "A database query language",
    ],
    correct: 1,
    category: "React",
    explanation:
      "The virtual DOM is a JavaScript representation of the real DOM that React uses to optimize rendering performance.",
  },
  {
    id: 17,
    question: "Which Express.js method is used to handle GET requests?",
    options: ["app.get()", "app.post()", "app.put()", "app.delete()"],
    correct: 0,
    category: "Express",
    explanation: "app.get() is the Express.js method used to handle HTTP GET requests to specific routes.",
  },
  {
    id: 18,
    question: "What is the purpose of MongoDB's _id field?",
    options: [
      "To store user passwords",
      "To create relationships between documents",
      "To uniquely identify documents",
      "To store metadata",
    ],
    correct: 2,
    category: "MongoDB",
    explanation:
      "The _id field in MongoDB is used to uniquely identify documents within a collection. It's automatically created if not provided.",
  },
  {
    id: 19,
    question: "Which Node.js module is used for file system operations?",
    options: ["http", "fs", "path", "url"],
    correct: 1,
    category: "Node.js",
    explanation: "The 'fs' (file system) module in Node.js provides an API for interacting with the file system.",
  },
  {
    id: 20,
    question: "What is state in React?",
    options: [
      "A CSS property",
      "A way to store component data that can change",
      "A database connection",
      "A routing mechanism",
    ],
    correct: 1,
    category: "React",
    explanation:
      "State in React is a way to store and manage data that can change over time within a component, triggering re-renders when updated.",
  },
]

// Helper Functions
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getRandomQuestions(questions, count = 10) {
  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, count)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

function getGrade(percentage) {
  if (percentage >= 90) return { grade: "A+", message: "Outstanding!", color: "success" }
  if (percentage >= 80) return { grade: "A", message: "Excellent!", color: "success" }
  if (percentage >= 70) return { grade: "B", message: "Good Job!", color: "info" }
  if (percentage >= 60) return { grade: "C", message: "Fair", color: "warning" }
  if (percentage >= 50) return { grade: "D", message: "Needs Improvement", color: "warning" }
  return { grade: "F", message: "Keep Learning!", color: "danger" }
}

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "MERN Stack Quiz Pro - Home",
  })
})

app.get("/learn", (req, res) => {
  res.render("learn", {
    title: "Learn MERN Stack - Complete Guide",
  })
})

app.get("/quiz", (req, res) => {
  // Initialize new quiz session
  req.session.quizQuestions = getRandomQuestions(quizQuestions, 10)
  req.session.currentQuestion = 0
  req.session.score = 0
  req.session.answers = []
  req.session.startTime = new Date()

  res.redirect("/quiz/question")
})

app.get("/quiz/question", (req, res) => {
  if (!req.session.quizQuestions) {
    return res.redirect("/")
  }

  const currentQuestion = req.session.currentQuestion || 0
  const questions = req.session.quizQuestions

  if (currentQuestion >= questions.length) {
    return res.redirect("/quiz/results")
  }

  const question = questions[currentQuestion]
  res.render("question", {
    title: `Question ${currentQuestion + 1} - MERN Quiz Pro`,
    question,
    currentQuestion: currentQuestion + 1,
    totalQuestions: questions.length,
    progress: Math.round(((currentQuestion + 1) / questions.length) * 100),
  })
})

app.post("/quiz/answer", (req, res) => {
  if (!req.session.quizQuestions) {
    return res.redirect("/")
  }

  const { answer } = req.body
  const currentQuestion = req.session.currentQuestion || 0
  const questions = req.session.quizQuestions
  const question = questions[currentQuestion]

  if (answer === undefined || answer === null) {
    return res.redirect("/quiz/question")
  }

  const userAnswer = Number.parseInt(answer)
  const isCorrect = userAnswer === question.correct

  if (isCorrect) {
    req.session.score = (req.session.score || 0) + 1
  }

  // Store answer details
  req.session.answers = req.session.answers || []
  req.session.answers.push({
    questionId: question.id,
    question: question.question,
    userAnswer: userAnswer,
    correctAnswer: question.correct,
    options: question.options,
    isCorrect: isCorrect,
    category: question.category,
    explanation: question.explanation,
  })

  req.session.currentQuestion = currentQuestion + 1
  res.redirect("/quiz/question")
})

app.get("/quiz/results", (req, res) => {
  if (!req.session.answers) {
    return res.redirect("/")
  }

  const score = req.session.score || 0
  const answers = req.session.answers || []
  const totalQuestions = answers.length
  const percentage = Math.round((score / totalQuestions) * 100)
  const endTime = new Date()
  const timeTaken = Math.round((endTime - req.session.startTime) / 1000) // in seconds

  // Calculate category-wise performance
  const categoryStats = {}
  answers.forEach((answer) => {
    if (!categoryStats[answer.category]) {
      categoryStats[answer.category] = { correct: 0, total: 0 }
    }
    categoryStats[answer.category].total++
    if (answer.isCorrect) {
      categoryStats[answer.category].correct++
    }
  })

  // Convert to percentage
  Object.keys(categoryStats).forEach((category) => {
    const stats = categoryStats[category]
    stats.percentage = Math.round((stats.correct / stats.total) * 100)
  })

  res.render("results", {
    title: "Quiz Results - MERN Quiz Pro",
    score,
    totalQuestions,
    percentage,
    answers,
    categoryStats,
    timeTaken: formatTime(timeTaken),
    grade: getGrade(percentage),
  })
})

app.get("/quiz/restart", (req, res) => {
  // Clear quiz session data
  delete req.session.quizQuestions
  delete req.session.currentQuestion
  delete req.session.score
  delete req.session.answers
  delete req.session.startTime

  res.redirect("/")
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - MERN Quiz Pro",
  })
})

// API Routes for AJAX requests
app.get("/api/questions/count", (req, res) => {
  res.json({ total: quizQuestions.length })
})

app.get("/api/categories", (req, res) => {
  const categories = [...new Set(quizQuestions.map((q) => q.category))]
  res.json(categories)
})

// Error handling middleware
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("500", {
    title: "500 - Server Error",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MERN Quiz Pro Server running on port ${PORT}`)
  console.log(`📱 Open your browser and visit: http://localhost:${PORT}`)
  console.log(`🎯 Ready to master the MERN stack!`)
  console.log(`📊 Total questions available: ${quizQuestions.length}`)
  console.log(`📚 Learning resources available at: http://localhost:${PORT}/learn`)
})

module.exports = app
