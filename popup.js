document.getElementById('setting-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const server_url = document.getElementById('server_url').value;
    const target_path = document.getElementById('target_path').value;



    chrome.storage.sync.get(['server_url', 'target_path'], function (data) {
        console.log('Retrieved settings:', data);
        if (data.server_url) {
            document.getElementById('server_url').value = data.server_url;
        }
        if (data.target_path) {
            document.getElementById('target_path').value = data.target_path;
        }
    });
    /* chrome.storage.sync.set({ server_url, target_path }, function () {
         console.log("done")
     })
 */
    console.log(server_url);
    console.log(target_path);



});