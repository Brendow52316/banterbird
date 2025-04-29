let username = localStorage.getItem("username");
if(!username){
    window.location.href = "/login";
}
function renderPost(post) {
    const template = document.getElementById("post-template").content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;
  
    // Always insert at the top
    document.getElementById("feed").prepend(template);
  }


async function submitPost() {
    const message = document.getElementById("postInput").value;
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                message: message,
            }),
        });
        if(response.ok){
            renderPost({ username: username, message: message});
            document.getElementById("postInput").value = ""; //Clear the input field after posting
        }

    } 
    catch (error){
        console.error("Error submitting post:", error);
    }
}

window.onload = async () => {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();
        
        // Reverse the posts so newest are first
        posts.slice().reverse().forEach(post => renderPost(post));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};
