```js
import './App.css'
import {useState,useEffect} from 'react';
import axios from 'axios';
const mydata = [
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    "postId": 1,
    "id": 2,
    "name": "quo vero reiciendis velit similique earum",
    "email": "Jayne_Kuhic@sydney.com",
    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    "postId": 1,
    "id": 3,
    "name": "odio adipisci rerum aut animi",
    "email": "Nikita@garfield.biz",
    "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    "postId": 1,
    "id": 4,
    "name": "alias odio sit",
    "email": "Lew@alysha.tv",
    "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  },
  {
    "postId": 1,
    "id": 5,
    "name": "vero eaque aliquid doloribus et culpa",
    "email": "Hayden@althea.biz",
    "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
  },
  {
    "postId": 2,
    "id": 6,
    "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
    "email": "Presley.Mueller@myrl.com",
    "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
  },
  {
    "postId": 2,
    "id": 7,
    "name": "repellat consequatur praesentium vel minus molestias voluptatum",
    "email": "Dallas@ole.me",
    "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
  },
  {
    "postId": 2,
    "id": 8,
    "name": "et omnis dolorem",
    "email": "Mallory_Kunze@marie.org",
    "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
  },
  {
    "postId": 2,
    "id": 9,
    "name": "provident id voluptas",
    "email": "Meghan_Littel@rene.us",
    "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
  },
  {
    "postId": 2,
    "id": 10,
    "name": "eaque et deleniti atque tenetur ut quo ut",
    "email": "Carmen_Keeling@caroline.name",
    "body": "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
  },
  {
    "postId": 3,
    "id": 11,
    "name": "fugit labore quia mollitia quas deserunt nostrum sunt",
    "email": "Veronica_Goodwin@timmothy.net",
    "body": "ut dolorum nostrum id quia aut est\nfuga est inventore vel eligendi explicabo quis consectetur\naut occaecati repellat id natus quo est\nut blanditiis quia ut vel ut maiores ea"
  },
  {
    "postId": 3,
    "id": 12,
    "name": "modi ut eos dolores illum nam dolor",
    "email": "Oswald.Vandervort@leanne.org",
    "body": "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit"
  },
  {
    "postId": 3,
    "id": 13,
    "name": "aut inventore non pariatur sit vitae voluptatem sapiente",
    "email": "Kariane@jadyn.tv",
    "body": "fuga eos qui dolor rerum\ninventore corporis exercitationem\ncorporis cupiditate et deserunt recusandae est sed quis culpa\neum maiores corporis et"
  },
  {
    "postId": 3,
    "id": 14,
    "name": "et officiis id praesentium hic aut ipsa dolorem repudiandae",
    "email": "Nathan@solon.io",
    "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum"
  },
  {
    "postId": 3,
    "id": 15,
    "name": "debitis magnam hic odit aut ullam nostrum tenetur",
    "email": "Maynard.Hodkiewicz@roberta.com",
    "body": "nihil ut voluptates blanditiis autem odio dicta rerum\nquisquam saepe et est\nsunt quasi nemo laudantium deserunt\nmolestias tempora quo quia"
  },
  {
    "postId": 4,
    "id": 16,
    "name": "perferendis temporibus delectus optio ea eum ratione dolorum",
    "email": "Christine@ayana.info",
    "body": "iste ut laborum aliquid velit facere itaque\nquo ut soluta dicta voluptate\nerror tempore aut et\nsequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis"
  },
  {
    "postId": 4,
    "id": 17,
    "name": "eos est animi quis",
    "email": "Preston_Hudson@blaise.tv",
    "body": "consequatur necessitatibus totam sed sit dolorum\nrecusandae quae odio excepturi voluptatum harum voluptas\nquisquam sit ad eveniet delectus\ndoloribus odio qui non labore"
  },
  {
    "postId": 4,
    "id": 18,
    "name": "aut et tenetur ducimus illum aut nulla ab",
    "email": "Vincenza_Klocko@albertha.name",
    "body": "veritatis voluptates necessitatibus maiores corrupti\nneque et exercitationem amet sit et\nullam velit sit magnam laborum\nmagni ut molestias"
  },
]
export default function App() {
   const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    // Simulate API request delay
    setTimeout(async () => {
      try {
          setData(prevData => [...prevData, ...mydata]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setIsLoading(true);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.email}>{item.email}</div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
