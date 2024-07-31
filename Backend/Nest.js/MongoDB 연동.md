# MongoDB 연동 with Mongoose

## 의존성 설치

```bash
yarn add @nestjs/mongoose mongoose
```

## Schema 생성

```ts
export type PostDocument = Post & Document;

@Schema()
export class Post {
	@Prop()
	id:number;

	@Prop()
	title:string;
  ...
}

export const PostSchema = SchemaFactory.createForClass(Post);
```

## Repository에 Model 주입

```js
@Injectable()
export class PostMongoRepository implements PostRepository {
	constructor(@InejectModel(Post.name) private postModel: Model<PostDocument>)
}
```

- model.find().exec()
- model.create(post)
- model.findById(id)
- model.findByIdAndDelete(id)
- model.findByIdAndUpdate(id, post)

## 몽고 디비 설정

```ts
// app.module.ts

@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot('mongodb+srv://<id>:<password>@<cluster>/post'),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  // ...
})
```
