import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from "@mui/material/Box";
import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack, TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ChangeEvent, FC, useCallback, useState} from "react";
import useInput from "../hooks/useInput.ts";
// import useSWR from "swr";
import {PhotoCamera} from "@mui/icons-material";
import axios from "axios";
import useSWR from "swr";
import fetcher from "../utils/fetcher.ts";
import {isValidISBN} from "../utils/isValidISBN.ts";

const AddBookDrawer: FC<AddBookDrawerProps> = ({open, toggleDrawer}) => {
    const [title, onChangeTitle, setTitle] = useInput('');
    const [price, onChangePrice, setPrice] = useInput('');
    const [author, onChangeAuthor, setAuthor] = useInput('');
    const [publisher, onChangePublisher, setPublisher] = useInput('');
    const [isbn, onChangeIsbn, setIsbn] = useInput('');
    const [description, onChangeDescription, setDescription] = useInput('');
    const [stock, onChangeStock, setStock] = useInput('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {mutate:mutateBooks} = useSWR(`${import.meta.env.VITE_SPRING_HOST}/api/books`,fetcher)

    const onChangeBookImg = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    }


    const submitBook = useCallback(() => {
        if (!title.trim() || !price.trim() || !author.trim() || !publisher.trim() || !isbn.trim() || !description.trim() || !stock.trim() || !selectedFile)  {
            alert("모든 입력 사항을 채워주세요.");
            return;
        }

        if (!/^\d+$/.test(price)) {
            alert("가격은 숫자만 입력해주세요.");
            return;
        }

        if (!/^\d+$/.test(stock)) {
            alert("재고는 숫자만 입력해주세요.");
            return;
        }

        if (!isValidISBN(isbn)) {
            alert("유효한 ISBN을 입력해주세요.");
            return;
        }

       const formData = new FormData();
       if (selectedFile){
           formData.append('bookImage',selectedFile);
       }
       formData.append('title', title);
       formData.append('price', price);
       formData.append('author', author);
       formData.append('publisher', publisher);
       formData.append('isbn', isbn);
       formData.append('description', description);
       formData.append('stock', stock);
       axios
           .post(
               `${import.meta.env.VITE_SPRING_HOST}/api/books`,
               formData,
               {withCredentials : true}
           )
           .then(() => {
               mutateBooks();
               setSelectedImage(null)
               setIsbn('');
               setPrice('');
               setAuthor('');
               setDescription('');
               setStock('');
               setPublisher('');
               setTitle('');
               toggleDrawer(false) })
           .catch((error) => {
               console.dir(error)
           })
    },[author, description, isbn, price, publisher, selectedFile, stock, title, toggleDrawer])

    return (
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
          <Box paddingX={'10px'}>
              <List>

                      <ListItem disablePadding>
                          <ListItemButton>
                              <ListItemIcon>
                                  dd
                              </ListItemIcon>
                              <ListItemText primary={'도서 등록 하기'} />
                          </ListItemButton>
                      </ListItem>

              </List>
              <Divider />
              <Stack sx={{maxWidth:'50vw'}}>
                  <Typography>사진</Typography>
                  {selectedImage && (
                          <img
                              style={{
                                  minWidth: '100px',
                                  minHeight: '100px',
                                  maxWidth: '100px',
                                  maxHeight: '100px',
                              }}
                              src={selectedImage}
                              alt={"noImg"}
                          />
                      )
                  }
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
                  {!selectedFile && <Typography color={'red'}>사진을 선택해 주세요</Typography>}
                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>도서명</Typography>
                      <TextField error={!title} id="standard-basic" label="ex)블루 프린트" variant="standard" sx={{minWidth:'30vw'}} value={title} onChange={onChangeTitle} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>가격</Typography>
                      <TextField error={!price} id="standard-basic" label="ex)20000" variant="standard" sx={{minWidth:'30vw'}} value={price} onChange={onChangePrice} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>저자</Typography>
                      <TextField error={!author} id="standard-basic" label="ex) 니컬러스 A.크리스타키스" variant="standard" sx={{minWidth:'30vw'}} value={author} onChange={onChangeAuthor} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'} >
                      <Typography>출판사</Typography>
                      <TextField error={!publisher} id="standard-basic" label="ex) 부키" variant="standard" sx={{minWidth:'30vw'}} value={publisher} onChange={onChangePublisher} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>ISBN</Typography>
                      <TextField error={!isbn} id="standard-basic" label="ex)979-11-950000-0-5" variant="standard" sx={{minWidth:'30vw'}} value={isbn} onChange={onChangeIsbn} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>도서 설명</Typography>
                      <TextField error={!description}  id="standard-basic" multiline={true} label="ex) 이 시대 최고 석학이 통섭 연구로 밝혀낸 인류 진화 역사의 놀라운 비밀. 우리는 서로 돕고, 배우고, 사랑하도록 프로그래밍되어 있다!" variant="standard" sx={{minWidth:'30vw'}} value={description} onChange={onChangeDescription} />
                  </Stack>

                  <Stack direction = "row" spacing={2} sx={{maxWidth:'40vw'}} alignItems={'baseline'}>
                      <Typography>재고</Typography>
                      <TextField error={!stock} id="standard-basic" label="ex) 3" variant="standard" sx={{minWidth:'30vw'}} value={stock} onChange={onChangeStock} />
                  </Stack>
                  <Button variant={"contained"} sx={{marginTop:'20px'}} onClick={submitBook}>등록</Button>
              </Stack>
                
          </Box>

      </SwipeableDrawer>
    );
};

interface AddBookDrawerProps {
    open: boolean;
    toggleDrawer: (openState: boolean) => void;
}
export default AddBookDrawer;