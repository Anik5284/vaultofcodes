const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addPostBtn = document.getElementById('addPostBtn');
const postsContainer = document.getElementById('postsContainer');

let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// Render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const titleEl = document.createElement('h3');
        titleEl.textContent = post.title;

        const dateEl = document.createElement('small');
        dateEl.textContent = `Published on ${post.date}`;

        const contentEl = document.createElement('p');
        contentEl.textContent = post.content;

        const delBtn = document.createElement('button');
        delBtn.textContent = '❌ Delete';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deletePost(index);

        postDiv.appendChild(delBtn);
        postDiv.appendChild(titleEl);
        postDiv.appendChild(dateEl);
        postDiv.appendChild(contentEl);

        postsContainer.appendChild(postDiv);
    });
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Add new post
function addPost() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) return alert('Please fill in all fields');

    const newPost = {
        title,
        content,
        date: new Date().toLocaleString()
    };

    posts.unshift(newPost); // Add to the start
    titleInput.value = '';
    contentInput.value = '';
    renderPosts();
}

// Delete post
function deletePost(index) {
    posts.splice(index, 1);
    renderPosts();
}

// Event listeners
addPostBtn.addEventListener('click', addPost);

// Initial render
renderPosts();
