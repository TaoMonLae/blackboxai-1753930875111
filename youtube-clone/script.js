// Sample video data
const videos = [
    {
        id: '1',
        title: 'Building Modern Web Applications with JavaScript',
        channel: 'Tech Academy',
        views: '1.2M views',
        time: '2 weeks ago',
        duration: '15:30',
        description: 'Learn how to build modern web applications using the latest JavaScript frameworks and best practices. This comprehensive tutorial covers everything from basic concepts to advanced techniques.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/ff0000/ffffff?text=JS+Tutorial'
    },
    {
        id: '2',
        title: 'CSS Grid Layout Complete Guide',
        channel: 'Design Masters',
        views: '850K views',
        time: '1 week ago',
        duration: '22:45',
        description: 'Master CSS Grid Layout with this complete guide. Learn how to create responsive layouts that work perfectly on all devices using modern CSS techniques.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/1a73e8/ffffff?text=CSS+Grid'
    },
    {
        id: '3',
        title: 'React Hooks Explained Simply',
        channel: 'Code Simplified',
        views: '2.1M views',
        time: '3 days ago',
        duration: '18:20',
        description: 'Understanding React Hooks has never been easier! This tutorial breaks down useState, useEffect, and custom hooks with practical examples.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/61dafb/000000?text=React+Hooks'
    },
    {
        id: '4',
        title: 'Node.js Backend Development',
        channel: 'Server Side Pro',
        views: '950K views',
        time: '5 days ago',
        duration: '35:15',
        description: 'Build scalable backend applications with Node.js. Learn about Express.js, database integration, authentication, and deployment strategies.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/339933/ffffff?text=Node.js'
    },
    {
        id: '5',
        title: 'Python Data Science Fundamentals',
        channel: 'Data Science Hub',
        views: '1.8M views',
        time: '1 week ago',
        duration: '42:30',
        description: 'Dive into data science with Python. Learn pandas, numpy, matplotlib, and how to analyze real-world datasets effectively.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/3776ab/ffffff?text=Python+DS'
    },
    {
        id: '6',
        title: 'Mobile App Development with Flutter',
        channel: 'Mobile Dev Central',
        views: '720K views',
        time: '4 days ago',
        duration: '28:45',
        description: 'Create beautiful mobile apps for iOS and Android using Flutter. Learn Dart programming and build your first cross-platform application.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/02569b/ffffff?text=Flutter'
    },
    {
        id: '7',
        title: 'Machine Learning Basics Explained',
        channel: 'AI Learning Path',
        views: '1.5M views',
        time: '2 weeks ago',
        duration: '31:20',
        description: 'Get started with machine learning! Understand algorithms, supervised vs unsupervised learning, and build your first ML model.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/ff6f00/ffffff?text=ML+Basics'
    },
    {
        id: '8',
        title: 'Web Security Best Practices',
        channel: 'Security First',
        views: '680K views',
        time: '6 days ago',
        duration: '25:10',
        description: 'Protect your web applications from common security threats. Learn about HTTPS, authentication, authorization, and secure coding practices.',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/d32f2f/ffffff?text=Security'
    }
];

// DOM Elements
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const searchGrid = document.getElementById('searchGrid');
const searchTitle = document.getElementById('searchTitle');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const downloadBtn = document.getElementById('downloadBtn');
const closeModal = document.getElementById('closeModal');

// Current state
let currentVideos = videos;
let isSearchMode = false;

// Initialize the app
function init() {
    renderVideos(videos, videoGrid);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Modal functionality
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    // Logo click to go back to home
    document.querySelector('.logo').addEventListener('click', () => {
        showHomePage();
    });
}

// Render videos in a grid
function renderVideos(videosToRender, container) {
    if (!videosToRender || videosToRender.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No videos found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
        return;
    }

    container.innerHTML = videosToRender.map(video => `
        <div class="video-card" onclick="openVideoModal('${video.id}')">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='📺';">
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-details">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-channel">${video.channel}</p>
                <p class="video-stats">${video.views} • ${video.time}</p>
            </div>
        </div>
    `).join('');
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.toLowerCase().includes(query.toLowerCase())
    );

    showSearchResults(query, filteredVideos);
}

// Show search results
function showSearchResults(query, results) {
    isSearchMode = true;
    videoGrid.parentElement.style.display = 'none';
    searchResults.style.display = 'block';
    searchTitle.textContent = `Search results for: "${query}"`;
    renderVideos(results, searchGrid);
}

// Show home page
function showHomePage() {
    isSearchMode = false;
    searchResults.style.display = 'none';
    videoGrid.parentElement.style.display = 'block';
    searchInput.value = '';
    renderVideos(videos, videoGrid);
}

// Open video modal
function openVideoModal(videoId) {
    const video = videos.find(v => v.id === videoId);
    
    if (!video) {
        alert('Video not found');
        return;
    }

    // Set video details
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    videoPlayer.src = video.videoUrl;
    
    // Setup download button
    downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = video.videoUrl;
        link.download = `${video.title}.mp4`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Show modal
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    videoPlayer.pause();
    videoPlayer.src = '';
}

// Sidebar functionality
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Handle different sidebar actions
        const text = item.querySelector('.sidebar-text')?.textContent;
        if (text === 'Home') {
            showHomePage();
        }
        // Add more sidebar functionality as needed
    });
});

// Responsive sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 1024) {
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }
}

// Menu button functionality
document.querySelector('.menu-btn').addEventListener('click', toggleSidebar);

// Handle window resize
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 1024) {
        sidebar.style.display = 'block';
    } else if (window.innerWidth <= 768) {
        sidebar.style.display = 'none';
    }
});

// Error handling for video loading
videoPlayer.addEventListener('error', (e) => {
    console.error('Video loading error:', e);
    alert('Sorry, this video cannot be played at the moment. Please try again later.');
});

// Loading state management
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading videos...</div>';
}

// Simulate loading delay for better UX
function simulateLoading(callback, delay = 500) {
    setTimeout(callback, delay);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some additional interactivity
document.addEventListener('click', (e) => {
    // Close search suggestions or dropdowns when clicking outside
    if (!e.target.closest('.search-container')) {
        // Hide any search suggestions if implemented
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space bar to play/pause video in modal
    if (e.code === 'Space' && videoModal.style.display === 'flex') {
        e.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Console welcome message
console.log('🎥 YouTube Clone loaded successfully!');
console.log('Features: Video grid, search, modal player, responsive design');
