// import logo from './logo.svg';
import './styles.css';
import { Component } from 'react';

import {loadPosts} from "../../components/utils/load-posts"
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component{
  // estado
  state = {
    posts:[],
    allPosts:[],
    page: 0,
    postsPerPage: 10
  };
  // é executado depois que a saída do componente é renderizada no DOM
  async componentDidMount(){
    await this.loadPosts();
  }
  
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    // altera estado
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      posts,
      allPosts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({
      posts,
      page: nextPage
    });
  }

  render(){
    const {posts, postsPerPage, allPosts, page} = this.state;
    const disabled = postsPerPage+page >= allPosts.length;
    return(
      <section className="container">
        <Posts posts={posts} />
        <div class="button-container">
          <Button 
          disabled = {disabled}
          functionClick = {this.loadMorePosts} 
          />
        </div>
      </section>
    );
  }
}

