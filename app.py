from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable CORS for API endpoints

# Blog posts data file
BLOG_DATA_FILE = 'blog_posts.json'

# Initialize blog posts if file doesn't exist
def initialize_blog_data():
    default_posts = [
        {
            "id": 1,
            "title": "Getting Started with React Hooks",
            "excerpt": "Learn how to use React Hooks to manage state and side effects in functional components.",
            "content": "React Hooks revolutionized the way we write React components. In this post, we'll explore useState, useEffect, and other essential hooks.",
            "date": "2024-03-15",
            "icon": "⚛️",
            "tags": ["React", "JavaScript", "Frontend"]
        },
        {
            "id": 2,
            "title": "CSS Grid vs Flexbox: When to Use Which",
            "excerpt": "A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.",
            "content": "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Let's dive into when to use each one.",
            "date": "2024-03-10",
            "icon": "🎨",
            "tags": ["CSS", "Web Design", "Frontend"]
        },
        {
            "id": 3,
            "title": "Building RESTful APIs with Flask",
            "excerpt": "Step-by-step tutorial on creating RESTful APIs using Python and Flask framework.",
            "content": "Flask is a lightweight and flexible Python web framework. In this tutorial, we'll build a complete RESTful API from scratch.",
            "date": "2024-03-05",
            "icon": "🐍",
            "tags": ["Python", "Flask", "Backend"]
        },
        {
            "id": 4,
            "title": "JavaScript Async/Await Explained",
            "excerpt": "Understanding asynchronous JavaScript with async/await for cleaner and more readable code.",
            "content": "Async/await makes asynchronous JavaScript code look and behave a bit more like synchronous code. Let's explore how it works.",
            "date": "2024-02-28",
            "icon": "⚡",
            "tags": ["JavaScript", "Async", "Programming"]
        },
        {
            "id": 5,
            "title": "Modern Web Design Principles",
            "excerpt": "Key principles and best practices for creating modern, user-friendly web interfaces.",
            "content": "Modern web design is about more than just aesthetics. It's about creating intuitive, accessible, and performant user experiences.",
            "date": "2024-02-20",
            "icon": "✨",
            "tags": ["Design", "UI/UX", "Web Development"]
        },
        {
            "id": 6,
            "title": "Git Workflow Best Practices",
            "excerpt": "Essential Git workflows and branching strategies for efficient team collaboration.",
            "content": "Mastering Git workflows is crucial for any developer. Here are the best practices for working with Git in a team environment.",
            "date": "2024-02-15",
            "icon": "🔀",
            "tags": ["Git", "Version Control", "Development"]
        }
    ]
    
    if not os.path.exists(BLOG_DATA_FILE):
        with open(BLOG_DATA_FILE, 'w') as f:
            json.dump(default_posts, f, indent=2)
    return default_posts

# Load blog posts from file
def load_blog_posts():
    if os.path.exists(BLOG_DATA_FILE):
        try:
            with open(BLOG_DATA_FILE, 'r') as f:
                return json.load(f)
        except:
            return initialize_blog_data()
    return initialize_blog_data()

# Save blog posts to file
def save_blog_posts(posts):
    with open(BLOG_DATA_FILE, 'w') as f:
        json.dump(posts, f, indent=2)

# Format date for display
def format_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    except:
        return date_str

# Routes
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/blog', methods=['GET'])
def get_blog_posts():
    """Get all blog posts"""
    posts = load_blog_posts()
    # Format dates for display
    for post in posts:
        post['date'] = format_date(post.get('date', ''))
        post['link'] = f"/blog/{post['id']}"
    return jsonify(posts)

@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    """Get a specific blog post by ID"""
    posts = load_blog_posts()
    post = next((p for p in posts if p['id'] == post_id), None)
    if post:
        post['date'] = format_date(post.get('date', ''))
        return jsonify(post)
    return jsonify({'error': 'Post not found'}), 404

@app.route('/api/blog', methods=['POST'])
def create_blog_post():
    """Create a new blog post (requires authentication in production)"""
    data = request.json
    posts = load_blog_posts()
    
    new_post = {
        'id': max([p['id'] for p in posts], default=0) + 1,
        'title': data.get('title'),
        'excerpt': data.get('excerpt'),
        'content': data.get('content', ''),
        'date': datetime.now().strftime('%Y-%m-%d'),
        'icon': data.get('icon', '📝'),
        'tags': data.get('tags', [])
    }
    
    posts.append(new_post)
    save_blog_posts(posts)
    return jsonify(new_post), 201

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # In production, you would:
    # 1. Send an email notification
    # 2. Save to database
    # 3. Send confirmation email to user
    
    # For now, just log and return success
    print(f"Contact form submission:")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Message: {message}")
    
    return jsonify({
        'success': True,
        'message': 'Thank you for your message! I\'ll get back to you soon.'
    })

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = [
        {
            "id": 1,
            "title": "E-Commerce Platform",
            "description": "A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
            "tags": ["React", "Node.js", "MongoDB"],
            "icon": "🛒",
            "link": "#"
        },
        {
            "id": 2,
            "title": "Task Management App",
            "description": "A collaborative task management application with real-time updates and team collaboration features.",
            "tags": ["Vue.js", "Firebase", "TypeScript"],
            "icon": "✅",
            "link": "#"
        },
        {
            "id": 3,
            "title": "Weather Dashboard",
            "description": "An interactive weather dashboard with forecasts, maps, and weather alerts using API integration.",
            "tags": ["JavaScript", "API", "CSS"],
            "icon": "🌤️",
            "link": "#"
        },
        {
            "id": 4,
            "title": "Social Media Analytics",
            "description": "Analytics dashboard for social media metrics with data visualization and reporting tools.",
            "tags": ["Python", "Django", "Chart.js"],
            "icon": "📊",
            "link": "#"
        },
        {
            "id": 5,
            "title": "Portfolio Website",
            "description": "A responsive portfolio website with modern design and smooth animations.",
            "tags": ["HTML", "CSS", "JavaScript"],
            "icon": "💼",
            "link": "#"
        },
        {
            "id": 6,
            "title": "Recipe Finder App",
            "description": "Find recipes based on ingredients with step-by-step instructions and nutritional information.",
            "tags": ["React Native", "API", "Redux"],
            "icon": "🍳",
            "link": "#"
        }
    ]
    return jsonify(projects)

if __name__ == '__main__':
    # Initialize blog data on startup
    initialize_blog_data()
    # Run the Flask app
    app.run(debug=True, port=5000)