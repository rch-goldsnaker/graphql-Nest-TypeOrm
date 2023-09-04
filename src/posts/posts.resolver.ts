import { Args, Int, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql'
import { Resolver } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { Post } from './post.entity'
import { CreatePostInput } from './dto/create-post.input'
import { Author } from 'src/authors/entities/author.entity'


@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) { }

  @Query((returns) => [Post])
  posts() {
    return this.postsService.findAll()
  }

  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findProductById(id)
  }

  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postsService.getAuthor(post.authorId)
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postsService.createPost(postInput)
  }
}
