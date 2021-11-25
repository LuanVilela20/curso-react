import './styles.css'

import { PostCard } from "../PostCard";

export const Posts = ({posts}) =>(
  <div className= "posts">     
    {posts.map(post =>( 
      <PostCard
        cover = {post.cover}
        key = {post.id}
        title = {post.title}
        id = {post.id}
        body = {post.body}
      />
      // <div className="post">
      //   <img src={post.cover} alt={post.title}/>
      //   <div key={post.id} className="post-content">
      //     <h1>{post.title}</h1>
      //     <p>{post.body}</p>
      //   </div>
      // </div>  
    ))}          
  </div>  
);