const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mern-quiz-secret-key-2024",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
    explanation:
      "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents.",
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
    options: [
      "A database query language",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A Node.js module",
    ],
    correct: 1,
    category: "React",
    explanation:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
  },
  {
    id: 5,
    question: "Which method is used to create a server in Node.js?",
    options: [
      "http.createServer()",
      "server.create()",
      "node.createServer()",
      "express.server()",
    ],
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
    explanation:
      "MongoDB runs on port 27017 by default. This is the standard port for MongoDB database connections.",
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
    explanation:
      "The 'npm init' command is used to create a package.json file and initialize a new Node.js project.",
  },
  {
    id: 10,
    question: "What does npm stand for?",
    options: [
      "Node Package Manager",
      "New Project Manager",
      "Node Program Manager",
      "Network Package Manager",
    ],
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
    options: [
      "A group of databases",
      "A group of documents",
      "A single document",
      "A database connection",
    ],
    correct: 1,
    category: "MongoDB",
    explanation:
      "A collection in MongoDB is a group of documents. It's equivalent to a table in relational databases.",
  },
  {
    id: 14,
    question:
      "Which of the following is NOT a valid React component lifecycle method?",
    options: [
      "componentDidMount",
      "componentWillUnmount",
      "componentDidUpdate",
      "componentWillRender",
    ],
    correct: 3,
    category: "React",
    explanation:
      "componentWillRender is not a valid React lifecycle method. The correct method is componentDidUpdate.",
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
    explanation:
      "app.get() is the Express.js method used to handle HTTP GET requests to specific routes.",
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
    explanation:
      "The 'fs' (file system) module in Node.js provides an API for interacting with the file system.",
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
];

const typingTextSamples = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This is a simple sentence to practice typing skills and improve your speed.",
    "Programming is fun and challenging. It requires patience and practice to master the art of coding in various languages.",
    "JavaScript is a powerful language used for web development and many other applications in modern software development today.",
    "Learning to type fast is essential for programmers and writers in the modern digital world of technology and communication.",
    "Web development involves creating websites and applications that run on the internet browser for users around the world.",
    "HTML provides the structure, CSS adds styling, and JavaScript brings interactivity to web pages for better user experience.",
    "Node.js allows developers to use JavaScript on the server side for backend development and full-stack applications.",
    "React is a popular library for building user interfaces with reusable components that make development faster and easier.",
    "Express.js is a minimal web framework that makes building web applications easier and more efficient for developers.",
    "MongoDB is a NoSQL database that stores data in flexible document format making it perfect for modern applications.",
    "Learning new programming languages opens up many opportunities for career growth and personal development in technology.",
    "Good coding practices include writing clean code, proper documentation, and following established conventions for better maintainability.",
    "Version control systems help developers track changes in their code and collaborate effectively with team members.",
    "Testing your code is important to ensure it works correctly and meets all the requirements specified by clients.",
    "Debugging skills are essential for finding and fixing errors in your programs to make them work as expected.",
    "Software development is a creative process that involves problem-solving and logical thinking to build useful applications.",
    "The internet has revolutionized how we communicate, work, and access information in our daily lives and business.",
    "Mobile applications have become an integral part of modern life, helping us stay connected and productive everywhere.",
    "Cloud computing provides scalable resources and services that help businesses grow and adapt to changing needs.",
    "Artificial intelligence is transforming many industries by automating tasks and providing intelligent solutions to complex problems.",
  ],
  medium: [
    "Advanced programming concepts include algorithms, data structures, and design patterns that help developers create efficient and maintainable solutions for complex problems.",
    "The implementation of complex features requires careful planning, thorough testing, and continuous refactoring to maintain code quality and ensure optimal performance.",
    "Modern web development involves multiple technologies working together: HTML for structure, CSS for styling, and JavaScript for interactivity and dynamic behavior.",
    "Database optimization techniques include indexing, query optimization, normalization, and proper schema design for better performance and data integrity.",
    "Version control systems like Git help developers track changes, collaborate effectively, and manage different versions of their codebase across multiple environments.",
    "Responsive web design ensures that websites work well on various devices including desktops, tablets, and mobile phones with different screen sizes.",
    "API development involves creating endpoints that allow different applications to communicate and share data securely through well-defined interfaces.",
    "Testing methodologies include unit testing, integration testing, and end-to-end testing to ensure software reliability and catch bugs early.",
    "Cloud computing platforms provide scalable infrastructure for deploying and hosting modern web applications with high availability and performance.",
    "Agile development methodologies emphasize iterative development, collaboration, and responding to change effectively to deliver value to customers quickly.",
    "Object-oriented programming principles such as encapsulation, inheritance, and polymorphism help create modular and reusable code structures.",
    "Software architecture patterns like MVC, MVP, and MVVM provide structured approaches to organizing code and separating concerns effectively.",
    "Performance monitoring and optimization involve profiling applications, identifying bottlenecks, and implementing solutions to improve user experience.",
    "Security best practices include input validation, authentication, authorization, and encryption to protect applications from various threats and vulnerabilities.",
    "Continuous integration and deployment pipelines automate the process of building, testing, and deploying applications to reduce errors and speed up delivery.",
    "Code review processes help maintain code quality, share knowledge among team members, and catch potential issues before they reach production.",
    "Documentation is crucial for maintaining software projects, helping new team members understand the codebase, and ensuring long-term maintainability.",
    "Scalability considerations involve designing systems that can handle increased load and growth without compromising performance or reliability.",
    "Error handling and logging mechanisms help developers identify, diagnose, and resolve issues quickly to maintain application stability.",
    "User experience design focuses on creating intuitive and accessible interfaces that meet user needs and provide value through thoughtful interaction design.",
  ],
  hard: [
    "Asynchronous programming paradigms enable developers to write non-blocking code that can handle multiple operations simultaneously without freezing the user interface or degrading performance.",
    "Machine learning algorithms process vast amounts of data to identify patterns, make predictions, and automate decision-making processes across various industries and applications.",
    "Microservices architecture decomposes monolithic applications into smaller, independent services that communicate through well-defined APIs and protocols for better scalability and maintainability.",
    "Cybersecurity measures include encryption, authentication, authorization, input validation, and regular security audits to protect against various threats and vulnerabilities in modern systems.",
    "DevOps practices integrate development and operations teams to improve collaboration, automate deployment processes, and ensure continuous delivery of high-quality software.",
    "Containerization technologies like Docker provide consistent environments for applications across different stages of the development lifecycle, from development to production deployment.",
    "Functional programming emphasizes immutability, pure functions, and declarative code to reduce bugs, improve maintainability, and enable better reasoning about program behavior.",
    "Performance optimization involves profiling applications, identifying bottlenecks, implementing caching strategies, and fine-tuning algorithms to improve user experience and system efficiency.",
    "Distributed systems require careful consideration of consistency, availability, partition tolerance, and eventual consistency patterns to handle network failures and maintain data integrity.",
    "Progressive web applications combine the best features of web and mobile apps to provide native-like experiences with offline capabilities and push notifications.",
    "Event-driven architecture enables loose coupling between components by using events to trigger actions and communicate changes throughout the system asynchronously.",
    "Database sharding and replication strategies help distribute data across multiple servers to improve performance, availability, and fault tolerance in large-scale applications.",
    "Load balancing techniques distribute incoming requests across multiple servers to ensure optimal resource utilization and prevent any single point of failure.",
    "Caching mechanisms at various levels including browser, CDN, application, and database caching help reduce latency and improve overall system performance significantly.",
    "Message queuing systems enable asynchronous communication between different parts of an application, improving scalability and reliability in distributed environments.",
    "Real-time data processing frameworks handle streaming data to provide immediate insights and enable responsive applications that react to events as they occur.",
    "Graph databases and algorithms are particularly useful for modeling and querying complex relationships between entities in social networks, recommendation systems, and knowledge graphs.",
    "Blockchain technology utilizes cryptographic hashing, consensus mechanisms, and distributed ledgers to create tamper-proof records and enable decentralized applications.",
    "Advanced debugging techniques include memory profiling, performance analysis, distributed tracing, and log aggregation to identify and resolve complex issues in production systems.",
    "Software design patterns provide proven solutions to common programming problems and help create more maintainable, flexible, and reusable code architectures.",
  ],
  expert: [
    "Quantum computing leverages quantum mechanical phenomena such as superposition and entanglement to perform calculations exponentially faster than classical computers for specific problem domains including cryptography and optimization.",
    "Advanced cryptographic protocols implement zero-knowledge proofs, homomorphic encryption, and multi-party computation to enable secure computation on encrypted data without revealing sensitive information to unauthorized parties.",
    "Compiler optimization techniques include dead code elimination, loop unrolling, instruction scheduling, register allocation, and various static analysis methods to improve performance and reduce resource consumption.",
    "Blockchain technology utilizes distributed ledger systems, consensus algorithms like proof-of-work and proof-of-stake, and cryptographic hashing to create immutable records and enable trustless decentralized applications.",
    "Artificial intelligence frameworks implement neural networks, deep learning architectures, reinforcement learning algorithms, and natural language processing to solve complex computational problems and automate decision-making.",
    "High-frequency trading systems require ultra-low latency architectures, custom hardware acceleration, FPGA programming, and sophisticated risk management algorithms to execute trades in microseconds.",
    "Bioinformatics algorithms process genomic sequences, protein structures, molecular interactions, and phylogenetic relationships to advance medical research, drug discovery, and personalized medicine applications.",
    "Quantum cryptography protocols use quantum key distribution, quantum entanglement, and quantum teleportation to provide theoretically unbreakable communication security based on fundamental physics principles.",
    "Advanced database systems implement ACID properties, distributed transactions, sophisticated indexing strategies, query optimization, and consistency models to handle massive datasets efficiently across multiple nodes.",
    "Computer vision algorithms utilize convolutional neural networks, image processing techniques, feature extraction, object detection, and pattern recognition to interpret and analyze visual information automatically.",
    "Distributed consensus algorithms like Raft, PBFT, and Byzantine fault tolerance ensure agreement among nodes in distributed systems even in the presence of network partitions and malicious actors.",
    "Advanced memory management techniques include garbage collection algorithms, memory pooling, copy collection, generational collection, and concurrent collection to optimize memory usage in high-performance applications.",
    "Formal verification methods use mathematical proofs, model checking, theorem proving, and specification languages to verify that software systems meet their correctness requirements and safety properties.",
    "Advanced networking protocols implement quality of service guarantees, traffic shaping, congestion control, and multicast routing to ensure reliable and efficient data transmission across complex networks.",
    "Parallel computing architectures utilize multi-core processors, GPU computing, distributed memory systems, and message passing interfaces to achieve high-performance computation for scientific applications.",
    "Advanced compiler design involves lexical analysis, syntax analysis, semantic analysis, intermediate code generation, code optimization, and target code generation to translate high-level languages efficiently.",
    "Computational complexity theory analyzes the resources required by algorithms, including time complexity, space complexity, and the classification of problems into complexity classes like P, NP, and PSPACE.",
    "Advanced operating system concepts include process scheduling algorithms, memory management units, virtual memory systems, file system implementations, and kernel design patterns for optimal resource utilization.",
    "Distributed storage systems implement consistent hashing, vector clocks, merkle trees, and eventual consistency models to provide scalable and fault-tolerant data storage across geographically distributed nodes.",
    "Advanced software engineering practices include domain-driven design, event sourcing, CQRS patterns, hexagonal architecture, and clean architecture principles to create maintainable and scalable enterprise applications.",
  ],
};

// Helper Functions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomQuestions(questions, count = 10) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function getGrade(percentage) {
  if (percentage >= 90)
    return { grade: "A+", message: "Outstanding!", color: "success" };
  if (percentage >= 80)
    return { grade: "A", message: "Excellent!", color: "success" };
  if (percentage >= 70)
    return { grade: "B", message: "Good Job!", color: "info" };
  if (percentage >= 60)
    return { grade: "C", message: "Fair", color: "warning" };
  if (percentage >= 50)
    return { grade: "D", message: "Needs Improvement", color: "warning" };
  return { grade: "F", message: "Keep Learning!", color: "danger" };
}

function getRandomTypingText(difficulty = "medium") {
  const texts = typingTextSamples[difficulty] || typingTextSamples.medium;
  return texts[Math.floor(Math.random() * texts.length)];
}

function calculateWPM(charactersTyped, timeInMinutes) {
  const wordsTyped = charactersTyped / 5;
  return Math.round(wordsTyped / timeInMinutes);
}

function calculateAccuracy(correctChars, totalChars) {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

function getRequiredWPM(level) {
  if (level <= 10) {
    return 30 + Math.floor(level / 2);
  } else if (level <= 25) {
    return 40 + Math.floor((level - 10) / 3);
  } else if (level <= 50) {
    return 55 + Math.floor((level - 25) / 2);
  } else if (level <= 75) {
    return 80 + Math.floor((level - 50) / 2);
  } else {
    return 105 + Math.floor((level - 75) / 2);
  }
}

app.get("/", (req, res) => {
  res.render("index", {
    title: "MERN Stack Quiz Pro - Home",
  });
});

app.get("/learn", (req, res) => {
  res.render("learn", {
    title: "Learn MERN Stack - Complete Guide",
  });
});

app.get("/typing-test", (req, res) => {
  res.render("typing-test", {
    title: "Advanced Typing Tester - MERN Quiz Pro",
  });
});

app.get("/api/typing-text", (req, res) => {
  const difficulty = req.query.difficulty || "medium";
  const text = getRandomTypingText(difficulty);
  res.json({ text, difficulty });
});

app.post("/api/typing-results", (req, res) => {
  const {
    level,
    wpm,
    accuracy,
    timeSpent,
    charactersTyped,
    errors,
    difficulty,
  } = req.body;

  if (!req.session.typingStats) {
    req.session.typingStats = {
      totalTests: 0,
      bestWPM: 0,
      averageAccuracy: 0,
      totalTimeSpent: 0,
      levelsCompleted: [],
      testHistory: [],
    };
  }

  const stats = req.session.typingStats;
  stats.totalTests++;
  stats.bestWPM = Math.max(stats.bestWPM, wpm);
  stats.totalTimeSpent += timeSpent;
  stats.averageAccuracy = Math.round(
    (stats.averageAccuracy * (stats.totalTests - 1) + accuracy) /
      stats.totalTests
  );

  const testResult = {
    date: new Date().toISOString(),
    level,
    wpm,
    accuracy,
    timeSpent,
    charactersTyped,
    errors,
    difficulty,
    passed: wpm >= getRequiredWPM(level) && accuracy >= 85,
  };

  stats.testHistory.push(testResult);

  if (stats.testHistory.length > 50) {
    stats.testHistory = stats.testHistory.slice(-50);
  }

  if (testResult.passed && !stats.levelsCompleted.includes(level)) {
    stats.levelsCompleted.push(level);
    stats.levelsCompleted.sort((a, b) => a - b);
  }

  res.json({
    success: true,
    passed: testResult.passed,
    requiredWPM: getRequiredWPM(level),
    stats: {
      totalTests: stats.totalTests,
      bestWPM: stats.bestWPM,
      averageAccuracy: stats.averageAccuracy,
      levelsCompleted: stats.levelsCompleted.length,
    },
  });
});

app.get("/api/typing-stats", (req, res) => {
  const stats = req.session.typingStats || {
    totalTests: 0,
    bestWPM: 0,
    averageAccuracy: 0,
    totalTimeSpent: 0,
    levelsCompleted: [],
    testHistory: [],
  };

  res.json(stats);
});

app.get("/quiz", (req, res) => {
  req.session.quizQuestions = getRandomQuestions(quizQuestions, 10);
  req.session.currentQuestion = 0;
  req.session.score = 0;
  req.session.answers = [];
  req.session.startTime = new Date();

  res.redirect("/quiz/question");
});

app.get("/quiz/question", (req, res) => {
  if (!req.session.quizQuestions) {
    return res.redirect("/");
  }

  const currentQuestion = req.session.currentQuestion || 0;
  const questions = req.session.quizQuestions;

  if (currentQuestion >= questions.length) {
    return res.redirect("/quiz/results");
  }

  const question = questions[currentQuestion];
  res.render("question", {
    title: `Question ${currentQuestion + 1} - MERN Quiz Pro`,
    question,
    currentQuestion: currentQuestion + 1,
    totalQuestions: questions.length,
    progress: Math.round(((currentQuestion + 1) / questions.length) * 100),
  });
});

app.post("/quiz/answer", (req, res) => {
  if (!req.session.quizQuestions) {
    return res.redirect("/");
  }

  const { answer } = req.body;
  const currentQuestion = req.session.currentQuestion || 0;
  const questions = req.session.quizQuestions;
  const question = questions[currentQuestion];

  if (answer === undefined || answer === null) {
    return res.redirect("/quiz/question");
  }

  const userAnswer = Number.parseInt(answer);
  const isCorrect = userAnswer === question.correct;

  if (isCorrect) {
    req.session.score = (req.session.score || 0) + 1;
  }

  req.session.answers = req.session.answers || [];
  req.session.answers.push({
    questionId: question.id,
    question: question.question,
    userAnswer: userAnswer,
    correctAnswer: question.correct,
    options: question.options,
    isCorrect: isCorrect,
    category: question.category,
    explanation: question.explanation,
  });

  req.session.currentQuestion = currentQuestion + 1;
  res.redirect("/quiz/question");
});

app.get("/quiz/results", (req, res) => {
  if (!req.session.answers) {
    return res.redirect("/");
  }

  const score = req.session.score || 0;
  const answers = req.session.answers || [];
  const totalQuestions = answers.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const endTime = new Date();
  const timeTaken = Math.round((endTime - req.session.startTime) / 1000);

  const categoryStats = {};
  answers.forEach((answer) => {
    if (!categoryStats[answer.category]) {
      categoryStats[answer.category] = { correct: 0, total: 0 };
    }
    categoryStats[answer.category].total++;
    if (answer.isCorrect) {
      categoryStats[answer.category].correct++;
    }
  });

  Object.keys(categoryStats).forEach((category) => {
    const stats = categoryStats[category];
    stats.percentage = Math.round((stats.correct / stats.total) * 100);
  });

  res.render("results", {
    title: "Quiz Results - MERN Quiz Pro",
    score,
    totalQuestions,
    percentage,
    answers,
    categoryStats,
    timeTaken: formatTime(timeTaken),
    grade: getGrade(percentage),
  });
});

app.get("/quiz/restart", (req, res) => {
  delete req.session.quizQuestions;
  delete req.session.currentQuestion;
  delete req.session.score;
  delete req.session.answers;
  delete req.session.startTime;

  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - MERN Quiz Pro",
  });
});

app.get("/api/questions/count", (req, res) => {
  res.json({ total: quizQuestions.length });
});

app.get("/api/categories", (req, res) => {
  const categories = [...new Set(quizQuestions.map((q) => q.category))];
  res.json(categories);
});

app.get("/api/level-requirements", (req, res) => {
  const requirements = [];
  for (let i = 1; i <= 100; i++) {
    requirements.push({
      level: i,
      requiredWPM: getRequiredWPM(i),
      difficulty:
        i <= 25 ? "easy" : i <= 50 ? "medium" : i <= 75 ? "hard" : "expert",
    });
  }
  res.json(requirements);
});

app.post("/api/reset-typing-progress", (req, res) => {
  req.session.typingStats = {
    totalTests: 0,
    bestWPM: 0,
    averageAccuracy: 0,
    totalTimeSpent: 0,
    levelsCompleted: [],
    testHistory: [],
  };

  res.json({ success: true, message: "Typing progress reset successfully" });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "500 - Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MERN Quiz Pro Server running on port ${PORT}`);
  console.log(`📱 Open your browser and visit: http://localhost:${PORT}`);
  console.log(`🎯 Ready to master the MERN stack!`);
  console.log(`📊 Total questions available: ${quizQuestions.length}`);
  console.log(
    `📚 Learning resources available at: http://localhost:${PORT}/learn`
  );
  console.log(
    `⌨️  Advanced Typing Tester available at: http://localhost:${PORT}/typing-test`
  );
  console.log(`🏆 100 levels of typing challenges await!`);
});

module.exports = app;
