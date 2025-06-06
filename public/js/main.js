// Main JavaScript file for MERN Quiz App

class MERNQuizPro {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initializeAnimations()
    this.setupProgressAnimations()
    this.initializeCounters()
    this.setupParticleEffects()
    this.initializeQuizFunctionality()
    this.setupPageTransitions()
    this.initializeMobileMenu()
    this.setupScrollEffects()
  }

  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.animateOnLoad()
    })

    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.handleScroll()
      }, 16),
    )

    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize()
      }, 250),
    )
  }

  // Advanced Animation System
  initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".tech-card, .feature-card, .step-item, .answer-card, .stat-card, .category-stat",
    )

    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  }

  animateElement(element) {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"

    requestAnimationFrame(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    })
  }

  // Progress Bar Animations
  setupProgressAnimations() {
    const progressBars = document.querySelectorAll(".progress-fill, .category-fill")

    progressBars.forEach((bar) => {
      const targetWidth = bar.dataset.progress || bar.style.width
      if (targetWidth) {
        bar.style.width = "0%"

        setTimeout(() => {
          bar.style.width = targetWidth.includes("%") ? targetWidth : `${targetWidth}%`
        }, 500)
      }
    })
  }

  // Animated Counters
  initializeCounters() {
    const counters = document.querySelectorAll("[data-count]")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.dataset.count)
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter()
            observer.unobserve(entry.target)
          }
        })
      })

      observer.observe(counter)
    })
  }

  // Particle Effects
  setupParticleEffects() {
    this.createFloatingParticles()
    this.setupButtonParticles()
  }

  createFloatingParticles() {
    const particleContainer = document.querySelector(".floating-shapes")
    if (!particleContainer) return

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div")
      particle.className = "floating-particle"
      particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `
      particleContainer.appendChild(particle)
    }

    // Add CSS animation
    if (!document.querySelector("#particle-styles")) {
      const style = document.createElement("style")
      style.id = "particle-styles"
      style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  setupButtonParticles() {
    const buttons = document.querySelectorAll(".cta-button, .submit-btn, .action-btn")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.createClickParticles(e)
      })
    })
  }

  createClickParticles(event) {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: clickParticle 0.6s ease-out forwards;
            `

      const angle = (i / 8) * Math.PI * 2
      const velocity = 50
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      particle.style.setProperty("--vx", `${vx}px`)
      particle.style.setProperty("--vy", `${vy}px`)

      button.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 600)
    }

    // Add confetti animation
    if (!document.querySelector("#click-particle-styles")) {
      const style = document.createElement("style")
      style.id = "click-particle-styles"
      style.textContent = `
                @keyframes clickParticle {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--vx), var(--vy)) scale(0);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  // Quiz Functionality
  initializeQuizFunctionality() {
    this.setupQuestionNavigation()
    this.setupAnswerSelection()
    this.setupFormSubmission()
    this.setupKeyboardNavigation()
  }

  setupQuestionNavigation() {
    const form = document.getElementById("quizForm")
    const submitBtn = document.getElementById("submitBtn")
    const options = document.querySelectorAll('input[name="answer"]')

    if (!form || !submitBtn || !options.length) return

    options.forEach((option, index) => {
      option.addEventListener("change", () => {
        this.handleAnswerSelection(option, submitBtn)
        this.animateOptionSelection(option)
      })
    })
  }

  handleAnswerSelection(selectedOption, submitBtn) {
    submitBtn.disabled = false
    submitBtn.classList.add("enabled")

    // Remove selection from all options
    document.querySelectorAll(".option-card").forEach((card) => {
      card.classList.remove("selected")
    })

    // Add selection to current option
    selectedOption.closest(".option-card").classList.add("selected")

    // Auto-scroll on mobile
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        submitBtn.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 300)
    }
  }

  animateOptionSelection(selectedOption) {
    const card = selectedOption.closest(".option-card")

    // Add ripple effect
    const ripple = document.createElement("div")
    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = "50%"
    ripple.style.top = "50%"
    ripple.style.marginLeft = -size / 2 + "px"
    ripple.style.marginTop = -size / 2 + "px"

    card.style.position = "relative"
    card.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)

    // Add CSS animation if not exists
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style")
      style.id = "ripple-styles"
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  setupAnswerSelection() {
    const options = document.querySelectorAll(".option-card")

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const radio = option.querySelector('input[type="radio"]')
        if (radio) {
          radio.checked = true
          radio.dispatchEvent(new Event("change"))
        }
      })
    })
  }

  setupFormSubmission() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        const submitBtn = form.querySelector('button[type="submit"]')
        if (submitBtn && !submitBtn.disabled) {
          this.showLoadingState(submitBtn)
          this.triggerPageTransition()
        }
      })
    })
  }

  showLoadingState(button) {
    const originalText = button.innerHTML
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
    button.disabled = true
    button.classList.add("loading")
  }

  setupKeyboardNavigation() {
    let currentIndex = -1
    const options = document.querySelectorAll('input[name="answer"]')

    if (!options.length) return

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault()
          currentIndex = (currentIndex + 1) % options.length
          this.focusOption(currentIndex, options)
          break

        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault()
          currentIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1
          this.focusOption(currentIndex, options)
          break

        case "Enter":
        case " ":
          if (currentIndex >= 0) {
            e.preventDefault()
            options[currentIndex].checked = true
            options[currentIndex].dispatchEvent(new Event("change"))
          }
          break

        case "1":
        case "2":
        case "3":
        case "4":
          e.preventDefault()
          const index = Number.parseInt(e.key) - 1
          if (options[index]) {
            options[index].checked = true
            options[index].dispatchEvent(new Event("change"))
          }
          break
      }
    })
  }

  focusOption(index, options) {
    if (index >= 0 && index < options.length) {
      options[index].focus()
      options[index].closest(".option-card").scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  // Page Transitions
  setupPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"], .nav-link')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href") !== window.location.pathname) {
          e.preventDefault()
          this.triggerPageTransition(link.getAttribute("href"))
        }
      })
    })
  }

  triggerPageTransition(url = null) {
    const transition = document.getElementById("pageTransition")
    if (transition) {
      transition.classList.add("active")

      if (url) {
        setTimeout(() => {
          window.location.href = url
        }, 500)
      }
    }
  }

  // Mobile Menu
  initializeMobileMenu() {
    const toggle = document.getElementById("mobileToggle")
    const navLinks = document.getElementById("navLinks")

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active")
        navLinks.classList.toggle("mobile-open")

        // Animate menu items
        if (navLinks.classList.contains("mobile-open")) {
          this.animateMobileMenuItems()
        }
      })

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
          toggle.classList.remove("active")
          navLinks.classList.remove("mobile-open")
        }
      })
    }
  }

  animateMobileMenuItems() {
    const menuItems = document.querySelectorAll(".nav-links .nav-link")

    menuItems.forEach((item, index) => {
      item.style.opacity = "0"
      item.style.transform = "translateY(-20px)"

      setTimeout(() => {
        item.style.transition = "all 0.3s ease"
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  // Scroll Effects
  setupScrollEffects() {
    this.setupParallax()
    this.setupNavbarScroll()
  }

  setupParallax() {
    const parallaxElements = document.querySelectorAll(".floating-shapes, .hero-visual")

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5
        element.style.transform = `translateY(${rate}px)`
      })
    })
  }

  setupNavbarScroll() {
    const navbar = document.querySelector(".navbar")
    let lastScrollTop = 0

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)"
      }

      // Add background on scroll
      if (scrollTop > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }

      lastScrollTop = scrollTop
    })
  }

  handleScroll() {
    this.updateScrollProgress()
    this.revealElements()
  }

  updateScrollProgress() {
    const progressBar = document.querySelector(".scroll-progress")
    if (progressBar) {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      progressBar.style.width = `${scrolled}%`
    }
  }

  revealElements() {
    const elements = document.querySelectorAll("[data-reveal]")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("revealed")
      }
    })
  }

  handleResize() {
    this.updateMobileMenu()
    this.recalculateAnimations()
  }

  updateMobileMenu() {
    const navLinks = document.getElementById("navLinks")
    const toggle = document.getElementById("mobileToggle")

    if (window.innerWidth > 768) {
      navLinks?.classList.remove("mobile-open")
      toggle?.classList.remove("active")
    }
  }

  recalculateAnimations() {
    // Recalculate any position-dependent animations
    const animatedElements = document.querySelectorAll(".animated")
    animatedElements.forEach((element) => {
      element.style.transform = ""
      element.style.opacity = ""
    })
  }

  animateOnLoad() {
    // Animate hero elements
    const heroElements = document.querySelectorAll(
      ".hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions",
    )

    heroElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"

      setTimeout(() => {
        element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })

    // Animate code window
    this.animateCodeWindow()
  }

  animateCodeWindow() {
    const codeLines = document.querySelectorAll(".code-line")

    codeLines.forEach((line, index) => {
      setTimeout(
        () => {
          line.style.opacity = "1"
          line.style.transform = "translateX(0)"
        },
        1000 + index * 500,
      )
    })
  }

  // Results Page Animations
  initializeResultsAnimations() {
    this.animateScoreCircle()
    this.animateCategoryBars()
    this.setupConfetti()
  }

  animateScoreCircle() {
    const scoreCircle = document.querySelector(".score-circle")
    const scorePercentage = document.querySelector(".score-percentage")

    if (!scoreCircle || !scorePercentage) return

    const finalScore = Number.parseInt(scorePercentage.textContent)
    let currentScore = 0
    const duration = 2000
    const increment = finalScore / (duration / 16)

    const animateScore = () => {
      if (currentScore < finalScore) {
        currentScore += increment
        scorePercentage.textContent = Math.floor(currentScore) + "%"
        requestAnimationFrame(animateScore)
      } else {
        scorePercentage.textContent = finalScore + "%"

        // Add celebration effect for high scores
        if (finalScore >= 80) {
          this.triggerCelebration()
        }
      }
    }

    setTimeout(animateScore, 500)
  }

  animateCategoryBars() {
    const categoryBars = document.querySelectorAll(".category-fill")

    categoryBars.forEach((bar, index) => {
      const targetWidth = bar.dataset.progress || bar.style.width

      setTimeout(() => {
        bar.style.width = "0%"
        bar.style.transition = "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)"

        setTimeout(() => {
          bar.style.width = targetWidth.includes("%") ? targetWidth : `${targetWidth}%`
        }, 100)
      }, index * 200)
    })
  }

  setupConfetti() {
    const scoreElement = document.querySelector(".score-percentage")
    if (scoreElement) {
      const score = Number.parseInt(scoreElement.textContent)
      if (score >= 90) {
        setTimeout(() => {
          this.createConfetti()
        }, 2000)
      }
    }
  }

  createConfetti() {
    const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"]
    const confettiCount = 100

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div")
        confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: ${Math.random() * 8 + 4}px;
                    height: ${Math.random() * 8 + 4}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    z-index: 10000;
                    pointer-events: none;
                    border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
                    animation: confettiFall ${Math.random() * 2 + 3}s linear forwards;
                `

        document.body.appendChild(confetti)

        setTimeout(() => {
          confetti.remove()
        }, 5000)
      }, i * 20)
    }

    // Add confetti animation
    if (!document.querySelector("#confetti-styles")) {
      const style = document.createElement("style")
      style.id = "confetti-styles"
      style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  triggerCelebration() {
    // Add celebration class to score circle
    const scoreCircle = document.querySelector(".score-circle")
    if (scoreCircle) {
      scoreCircle.classList.add("celebration")

      // Add celebration styles
      if (!document.querySelector("#celebration-styles")) {
        const style = document.createElement("style")
        style.id = "celebration-styles"
        style.textContent = `
                    .score-circle.celebration {
                        animation: celebrate 1s ease-in-out;
                    }
                    
                    @keyframes celebrate {
                        0%, 100% { transform: scale(1) rotate(0deg); }
                        25% { transform: scale(1.1) rotate(-5deg); }
                        75% { transform: scale(1.1) rotate(5deg); }
                    }
                `
        document.head.appendChild(style)
      }
    }
  }

  // Utility Functions
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Notification System
  showNotification(message, type = "info", duration = 5000) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `

    // Style the notification
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            backdrop-filter: blur(10px);
        `

    // Add close functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      this.removeNotification(notification)
    })

    // Add to page
    document.body.appendChild(notification)

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)"
    })

    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification)
    }, duration)

    return notification
  }

  removeNotification(notification) {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }

  getNotificationIcon(type) {
    const icons = {
      success: "check-circle",
      warning: "exclamation-triangle",
      error: "times-circle",
      info: "info-circle",
    }
    return icons[type] || icons.info
  }

  getNotificationColor(type) {
    const colors = {
      success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      warning: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      error: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      info: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }
    return colors[type] || colors.info
  }

  // Copy to Clipboard
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showNotification("Copied to clipboard!", "success")
        })
        .catch(() => {
          this.fallbackCopyToClipboard(text)
        })
    } else {
      this.fallbackCopyToClipboard(text)
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand("copy")
      this.showNotification("Copied to clipboard!", "success")
    } catch (err) {
      this.showNotification("Failed to copy to clipboard", "error")
    }

    document.body.removeChild(textArea)
  }
}

// Initialize the application
const mernQuizPro = new MERNQuizPro()

// Global functions for backward compatibility
function shareResults() {
  const scoreElement = document.querySelector(".score-percentage")
  const score = scoreElement ? scoreElement.textContent : "0%"
  const text = `I scored ${score} on the MERN Stack Quiz Pro! Test your knowledge too.`

  if (navigator.share) {
    navigator
      .share({
        title: "MERN Quiz Pro Results",
        text: text,
        url: window.location.origin,
      })
      .catch((err) => {
        console.log("Error sharing:", err)
        mernQuizPro.copyToClipboard(`${text} ${window.location.origin}`)
      })
  } else {
    mernQuizPro.copyToClipboard(`${text} ${window.location.origin}`)
  }
}

// Initialize results animations if on results page
if (window.location.pathname.includes("/results")) {
  document.addEventListener("DOMContentLoaded", () => {
    mernQuizPro.initializeResultsAnimations()
  })
}

// Add scroll progress indicator
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)
})

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = MERNQuizPro
}
