import React,{ useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { 
    Container,
    Scroller,
    ListArea,
    EmptyWarning
} from './styles';

// import AppointmentItem from '../../components/AppointmentItem';
import Api from "../../Api";

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(()=>{
        getAppointments();
    }, []);

    const getAppointments = async () => {
        setLoading(true);
        setList([]);
        let res = await Api.getAppointments();
        if(res.error == ''){
            console.log(res.list);
            setList(res.list);
        }else{
            alert("Error: "+res.error);
        }

        setLoading(false);
    }

    return(
        <Container>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getAppointments} />
            }>

                {!loading && list.length === 0 &&
                    <EmptyWarning>Não há agendamentos.</EmptyWarning>
                }

                <ListArea>
                    {/* {list.map((item, k)=>(
                        <AppointmentItem key={k} data={item}  />
                    ))} */}
                </ListArea>
            </Scroller>

        </Container>
    );
}
