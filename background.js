

chrome.downloads.onCreated.addListener((downloadItem) => {
    chrome.storage.sync.get('server_url', (data) => {
        const server_url = data.server_url;




        const endpoint = '/download';

        const send = async () => {
            try {
                const response = await fetch(`${server_url.trim()}${endpoint}`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ url: downloadItem.url })
                });
                const data = await response.json();
                alert(data);
            } catch (err) {
                alert(err)
            }
        }


        if (server_url) {
            send();
        } else {
            alert("not get url");
        }
    });
});