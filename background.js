chrome.downloads.onCreated.addListener((downloadItem) => {
    chrome.storage.sync.get(['server_url', 'target_path'], (data) => {
        const server_url = data.server_url;
        const target_path = data.target_path;



        console.log(server_url);
        console.log(target_path);
        console.log(downloadItem.url);
    });
});