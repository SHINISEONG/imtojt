import {Card, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IBook} from "../typings/db.ts";
import {FC, useCallback, useState} from "react";
import Box from "@mui/material/Box";
import BookDialog from "./BookDialog.tsx";

const BookThumbnail:FC<Props> = ({book}) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('read');



    const onCloseBookDialog = useCallback(() => {
        setOpen(false)
    },[]);

    const onClickBook = useCallback(()=>{
        setOpen(true)
    },[]);

    return (
            <Box>
                <Card variant={"outlined"} onClick={onClickBook} sx={{backgroundColor:'#FFFFFF', minWidth:'90%', minHeight:'200px', padding: '15px', marginBottom: '10px'}}>
                    <Stack direction="row" alignItems={'center'} sx={{height:'200px'}} spacing={10}>
                         <img
                                src={`${import.meta.env.VITE_SPRING_HOST}/${book.imageFileName}`}
                                alt={`${book.imageFileName}`}
                                loading={"lazy"}
                                style={{ width: '180px', height: '180px' }}
                         />
                        <Stack justifyContent={"space-between"} sx={{width: '70%', height: '150px'}}>
                            <Typography variant={"h6"} component={"div"} sx={{fontWeight:'bold'}}>{book.title}</Typography>
                            <Typography variant={"body2"} component={"div"}>{book.description}</Typography>
                            <Typography
                                variant={"h6"}
                                component={"div"}
                                sx={{ fontWeight: 'medium', textAlign: 'right' }}
                            >{book.price}원</Typography>
                        </Stack>
                    </Stack>
                </Card>
                <BookDialog book={book} open={open} onCloseBookDialog={onCloseBookDialog} mode={mode} setMode={setMode} />
            </Box>

    );
};
interface Props {
    book: IBook;
}
export default BookThumbnail;