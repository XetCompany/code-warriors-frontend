import formApi from "../store/Form/FormApi";
import { useEffect } from "react";
import ratingStore from "../store/Rating/RatingStore";
import { observer } from "mobx-react";
import { Card } from "antd";

const Rating = () => {
  useEffect(() => {
    formApi.getRating().then((response) => {
      console.log("response.data.users");
      ratingStore.setData(response.data.users);
      ratingStore.setIsShowData(true);
      console.log(ratingStore.data);
      console.log(response.data.users);
    });
  }, []);

  if (!ratingStore.isShowData) {
    return <div style={{display: 'flex', justifyContent: 'center', fontSize: '30px', fontWeight: 400}}>Загрузка...</div>;
  }

  return (
    <div className="rating">
      <h1>Рейтинг</h1>
        {ratingStore.data.map((request) => {
          return <Card className="rate">
            <div>Пользователь: {request.username}</div>
            <div>Рейтинг: {request.avg_rating}</div>
          </Card>
        })}
    </div>
  );
};

export default observer(Rating);
