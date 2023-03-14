
let allBlogs = JSON.parse(localStorage.getItem('allBlogs'))
const urlParams = new URLSearchParams(window.location.search);
let index =  urlParams.get('id');

let blog = allBlogs[index];
document.getElementById('blogBannerImage').setAttribute("src", blog.blogBanner)
document.getElementById('blogTitle').innerHTML = blog.title
document.getElementById('blogContent').innerHTML = blog.blogContent
document.getElementById('blogAuthor').innerHTML = `~ ${blog.fullName}`
