document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetchRepositories(query);
});

async function fetchRepositories(query) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!query) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            data.items.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'repo';
                repoDiv.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                `;
                resultsDiv.appendChild(repoDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No repositories found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>There was an error fetching the data.</p>';
    }
}