import MainHeader from "@/components/layout/main-header";

function Layout(props: any) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
