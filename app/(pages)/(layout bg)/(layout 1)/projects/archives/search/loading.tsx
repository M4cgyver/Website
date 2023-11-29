import Loading from "@/components/loading";

export default function LoadingSearchResults() {
    return (<div style={{position: "relative", aspectRatio: "1920/1080"}}>
        <Loading>
            The search results are loading, please wait...
        </Loading>
    </div>);
  }