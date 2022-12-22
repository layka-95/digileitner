import Link from 'next/link';
import Image from 'next/image';



function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
  
      <Link href={linkPath}>
        <div className="item__post-hover">
          <div className="blog__image">
            <img src={imagePath} alt={title} width={300} height={200} layout='responsive' />
          </div>
          <div className="blog__content">
            <h3 className='blog__det'>{title}</h3>
            <time className='blog__det'>{formattedDate}</time>
            <p className='blog__det'>{excerpt}</p>
          </div>
        </div>
      </Link>

  );
}

export default PostItem;
