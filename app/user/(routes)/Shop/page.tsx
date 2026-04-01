
import ProductPage from "../../_components/ProductPage";
type SearchParamsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const currentParams = await searchParams;
  const product = (currentParams?.product as string) ?? "";
 

  return (
    <>
      <ProductPage searchProduct={product}/>
    </>
  )
}

export default Page

