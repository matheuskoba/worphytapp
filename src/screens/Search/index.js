import React,{ useState } from "react";
import { 
    Container,
    SearchArea,
    SearchInput,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning
} from './styles';

import PersonalItem from '../../components/PersonalItem';
import Api from "../../Api";

export default () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [emptyList, setEmptyList] = useState(false);
    const [list, setList] = useState([]);

    const searchPersonal = async () => {
        setEmptyList(false);
        setLoading(true);
        setList([]);

        if(searchText != ''){
            let res = await Api.search(searchText);
            if(res.error == ''){
                if(res.list.length > 0){
                    setList(res.list);
                }else{
                    setEmptyList(true);
                }
            }else{
                alert("Error: "+res.error);
            }
        }

        setLoading(false);
    }

    return(
        <Container>
            <SearchArea>
                <SearchInput 
                    placeholder="Digite o nome do personal"
                    placeholderTextColor="#fff"
                    value={searchText}
                    onChangeText={t=>setSearchText(t)}
                    onEndEditing={searchPersonal}
                    returnKeyType="search"
                    autoFocus={true}
                    selectTextOnFocus={true}
                />
            </SearchArea>

            <Scroller>
                {loading &&
                    <LoadingIcon size="large" color="#fff" />
                }

                {emptyList &&
                    <EmptyWarning>Nenhum personal foi encontrado.</EmptyWarning>
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <PersonalItem key={k} data={item}  />
                    ))}
                </ListArea>


            </Scroller>

        </Container>
    );
}
