document.getElementById('setting-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const server_url = document.getElementById('server_url').value;
    chrome.storage.sync.set({ server_url, target_path }, function () {
        console.log("done")
    })

    console.log(server_url);
    console.log(target_path);



});