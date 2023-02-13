import path from "path";
import fs from "fs/promises";
import Link from "next/link";

const DummyDate = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`dummydata/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
};

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: { products: data.products },
    revalidate: 10,
  };
}

export default DummyDate;
