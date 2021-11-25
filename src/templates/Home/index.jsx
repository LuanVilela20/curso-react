// import logo from './logo.svg';
import './styles.css';
import { Component } from 'react';

import {loadPosts} from "../../components/utils/load-posts"
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component{
  // estado
  state = {
    posts:[],
    allPosts:[],
    page: 0,
    postsPerPage: 10,
    searchValue: ""
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

  handleChange = (e) => {
    const {value} = e.target; 
    this.setState({searchValue: value});
  }

  render(){
    const {posts, postsPerPage, allPosts, page, searchValue} = this.state;
    const disabled = postsPerPage+page >= allPosts.length;
    
    const filteredPosts = !!searchValue ?
    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

    return(
      <section className="container">
        <div class="search-container">
          {!!searchValue && (        
            <h1>Search value: {searchValue}</h1>        
          )}
          <TextInput handleChange={this.handleChange} searchValue={searchValue}/>
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )} 
        {filteredPosts.length === 0 && (
          <p>Nao existe post</p>
        )}

        <div class="button-container">
          {!searchValue &&(
            <Button 
              disabled = {disabled}
              functionClick = {this.loadMorePosts} 
            />
          )}  
        </div>
      </section>
    );
  }
}

