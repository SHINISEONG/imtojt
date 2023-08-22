import BookThumbnail from "../components/BookThumbnail.tsx";
import Box from "@mui/material/Box";
import useSWR from "swr";
import fetcher from "../utils/fetcher.ts";
import {IBook} from "../typings/db.ts";

const Books = () => {
    const {data: books} = useSWR(`${import.meta.env.VITE_SPRING_HOST}/api/books`,fetcher)
    return (
        <Box padding={'10px'}>
            {!books && <div>등록된 도서가 없습니다.</div>}
            {books?.map((book:IBook, idx:number)=> (
                <BookThumbnail book = {book} key={idx} />
            ))}
        </Box>
    );
};

export default Books;