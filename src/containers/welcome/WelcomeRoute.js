import React, {Component} from "react";
import {Container, Col, Form, FormGroup, Input, Label, Button, Row} from "reactstrap";
import AuthenService from "../../services/AuthenService";
import * as roomApi from "../../api/room-api";

class WelcomeRoute extends Component {

    state = {
        room_id: '',
        name: '',
        error: '',
    };

    _handleInputChange(id, event) {
        const value = event.target.value;
        this.setState({
            [id]: value,
            error: ''
        });
    }

    async _handleJoin() {
        const {room_id, name} = this.state;

        if (!room_id) {
            this.setState({
                error: 'Mã phòng không được để trống!'
            });
            return;
        }

        if (!name) {
            this.setState({
                error: 'Tên không được để trống!'
            });
            return;
        }

        try {
            const joinedRoom = await roomApi.joinRoom({name, room: room_id});
            console.log('joinedRoom', joinedRoom);

            AuthenService.set({
                ...joinedRoom,
                name,
                room_id,
                is_leader: false
            });

            this.props.history.replace(`/room/${room_id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    async _handleCreateRoom() {
        try {
            const newRoom = await roomApi.createRoom();
            console.log('newroom', newRoom);

            AuthenService.set({
                name: 'Quản trò',
                room_info: newRoom,
                room_id: newRoom.code,
                is_leader: true
            });

            this.props.history.replace(`/room/${newRoom.code}`);
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        const {
            room_id,
            name,
            error
        } = this.state;

        return (
            <Container>
                <Row
                    className='d-flex justify-content-center'
                    style={{marginTop: 40}}
                >
                    <Col sm={4} className=''>
                        <Form>
                            <FormGroup>
                                <Label>Mã phòng</Label>
                                <Input
                                    type="number"
                                    value={room_id}
                                    onChange={(event) => this._handleInputChange('room_id', event)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Tên của bạn</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(event) => this._handleInputChange('name', event)}
                                />
                            </FormGroup>

                            <p className='error-text'>{error}</p>

                            <Button
                                onClick={this._handleJoin.bind(this)}
                                color='primary'
                            >Vào phòng</Button>
                            <span> Hoặc </span>
                            <Button
                                outline
                                onClick={this._handleCreateRoom.bind(this)}
                            >Tạo phòng mới</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default WelcomeRoute;
