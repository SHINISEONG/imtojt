import {Button, Dialog, Stack, Table, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {IBook} from "../typings/db.ts";
import useInput from "../hooks/useInput.ts";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../utils/fetcher.ts";
import {PhotoCamera} from "@mui/icons-material";


const BookDialog: FC<Props> = ({book, open, onCloseBookDialog, mode, setMode}) => {
    const [title, onChangeTitle, setTitle] = useInput(book.title);
    const [price, onChangePrice, setPrice] = useInput(book.price);
    const [author, onChangeAuthor, setAuthor] = useInput(book.author);
    const [publisher, onChangePublisher, setPublisher] = useInput(book.publisher);
    const [isbn, onChangeIsbn, setIsbn] = useInput(book.isbn);
    const [description, onChangeDescription, setDescription] = useInput(book.description);
    const [stock, onChangeStock, setStock] = useInput(book.stock);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(`${import.meta.env.VITE_SPRING_HOST}/${book.imageFileName}`);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {mutate: mutateBooks} = useSWR(`${import.meta.env.VITE_SPRING_HOST}/api/books`,fetcher)

    const onChangeBookImg = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    }

    const submitBookUpdate = useCallback(() => {
        const formData = new FormData();
        if (selectedFile){
            formData.append('bookImage',selectedFile);
        }
        formData.append('title', title);
        formData.append('price', price.toString());
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('isbn', isbn);
        formData.append('description', description);
        formData.append('stock', stock.toString());

        axios
            .patch(
                `${import.meta.env.VITE_SPRING_HOST}/api/books/${book.id}`,
                formData,
                {withCredentials : true}
            )
            .then(() => {
                mutateBooks();
                setSelectedImage(`${import.meta.env.VITE_SPRING_HOST}/${book.imageFileName}`)
                setIsbn(book.isbn);
                setPrice(book.price);
                setAuthor(book.author);
                setDescription(book.description);
                setStock(book.stock);
                setPublisher(book.publisher);
                setTitle(book.title);
                setMode('read');
            })
            .catch((error) => {
                console.dir(error)
            })
    },[author, book.author, book.description, book.id, book.imageFileName, book.isbn, book.price, book.publisher, book.stock, book.title, description, isbn, mutateBooks, price, publisher, selectedFile, setAuthor, setDescription, setIsbn, setMode, setPrice, setPublisher, setStock, setTitle, stock, title]);

    const onClickBookUpdate = useCallback(() => {
        setMode('update');
    },[setMode]);

    useEffect(()=>{
        setSelectedImage(`${import.meta.env.VITE_SPRING_HOST}/${book.imageFileName}`)
        setIsbn(book.isbn);
        setPrice(book.price);
        setAuthor(book.author);
        setDescription(book.description);
        setStock(book.stock);
        setPublisher(book.publisher);
        setTitle(book.title);
    },[book.author, book.description, book.imageFileName, book.isbn, book.price, book.publisher, book.stock, book.title, setAuthor, setDescription, setIsbn, setPrice, setPublisher, setStock, setTitle]);
    return (
        <Dialog open={open} onClose={onCloseBookDialog} >
            <Stack direction={'row'}>
                <Stack>
                <img
                    src={selectedImage}
                    alt={`${book.imageFileName}`}
                    loading={"lazy"}
                    style={{maxHeight: '350px', maxWidth: '150px' }}
                />
                {mode !== 'read' &&
                    <Button
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{ maxWidth: '100px' }}
                    >
                        1
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            id="file"
                            name="file"
                            onChange={onChangeBookImg}
                        />
                    </Button>
                }
                </Stack>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>책 제목</TableCell>
                                {mode === 'read' ? (<TableCell>{book.title}</TableCell>):(<TextField value={title} onChange={onChangeTitle}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>저 자</TableCell>
                                {mode === 'read' ? (<TableCell>{book.author}</TableCell>):(<TextField value={author} onChange={onChangeAuthor}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>가 격</TableCell>
                                {mode === 'read' ? (<TableCell>{book.price + '원'}</TableCell>):(<TextField value={price} onChange={onChangePrice}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>출판사</TableCell>
                                {mode === 'read' ? (<TableCell>{book.publisher}</TableCell>):(<TextField value={publisher} onChange={onChangePublisher}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>책 소개</TableCell>
                                {mode === 'read' ? (<TableCell>{book.description}</TableCell>):(<TextField value={description} onChange={onChangeDescription}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>재고</TableCell>
                                {mode === 'read' ? (<TableCell>{book.stock}</TableCell>):(<TextField value={stock} onChange={onChangeStock}></TextField>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>ISBN</TableCell>
                                {mode === 'read' ? (<TableCell>{book.isbn}</TableCell>):(<TextField value={isbn} onChange={onChangeIsbn}></TextField>)}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Stack>
            { mode === 'read' &&
                <Button variant={"contained"} onClick={onClickBookUpdate}>
                    책 수정하기
                </Button>
            }
            { mode === 'update' &&
                <Button variant={"contained"} onClick={submitBookUpdate}>
                    수정 완료
                </Button>
            }
        </Dialog>
    );
}

interface Props {
    book: IBook;
    open: boolean;
    onCloseBookDialog: () => void;
    mode: string;
    setMode: Dispatch<SetStateAction<string>>
}
export default BookDialog;