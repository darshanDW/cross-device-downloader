

chrome.downloads.onCreated.addListener((downloadItem) => {
    chrome.storage.sync.get(['server_url'], (data) => {
        const server_url = data.server_url;



        console.log(server_url);
        console.log(downloadItem.url);
        const send = async () => {
            try {
                const response = await fetch('https://bdb9-106-66-28-34.ngrok-free.app/download', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ url: downloadItem.url })
                });
                const data = await response.json();
                console.log(data);

            } catch (err) {
                console.log(err);
            }
        }


        if (server_url) {
            send();
        } else {
            console.log("not get url");
        }
    });
});