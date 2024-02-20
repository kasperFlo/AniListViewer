document.addEventListener("DOMContentLoaded", event => {
    console.dir(("DOM loaded Console Test"))


    let url = 'https://graphql.anilist.co';
    let xhr = new XMLHttpRequest();
    let APIData = null;
    let error = null;

    let textBox = document.getElementById("textBOX");

    let query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
                  total
                  currentPage
                  lastPage
                  hasNextPage
                  perPage
            }
        media (id: $id, search: $search) {
          id
          title {
            romaji
          }
        } } } `;
    let RequestVariables = {
        search: "Attack",
        page: 4,
        perPage: 16
    };

    let requestBody = JSON.stringify({
        query: query,
        variables: RequestVariables
    });


    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(requestBody);

    /*takes API json and Displays it onto page */
    function pageParse(RawJson) {
        let pData = RawJson.data.Page.media;
        textBox.innerText = ""; // Clear existing content

        // Return an array of JSX elements. We now build those directly
        return pData.map((media) => {
            return (
                <div className="card m-2 w-2/5 flex flex-row p-3">
                    <div className="m-2 w-2/12 justify-end " style={{ width: '140px' }} >Media ID: {media.id}</div>
                    <div className="m-2 w-10/12 justify-end">Title (Romaji): {media.title.romaji}</div>
                </div>
            );
        });
    }

    /*Handles API json and What to do with it */
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status == "200") { // if response from server is good
                APIData = JSON.parse(this.responseText);
                console.dir(APIData);

                const rootTextBOX = ReactDOM.createRoot(document.getElementById('textBOX'));
                const cardElements = pageParse(APIData)
                rootTextBOX.render(cardElements);

                // console.dir("Request Headers:\n"+  xhr.getAllResponseHeaders())
                // console.dir("Request Body :\n" +  JSON.stringify(requestBody) )

            } else {
                textBox.innerText = this.statusText;
                console.dir(error)
            }
        }
    }

}); // DOM Content