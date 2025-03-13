// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple hardcoded check (replace with real auth in a backend)
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'forum.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password';
    }
});

// Logout functionality
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Load posts from localStorage
function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'col-md-6 post-card';
        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <small>Posted on ${post.date}</small>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Submit new post
document.getElementById('postForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const date = new Date().toLocaleString();

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift({ title, content, date });
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('postForm').reset();
    loadPosts();
});