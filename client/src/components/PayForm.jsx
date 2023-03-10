import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { yellow } from '../global-variables';
import {
	SubmitButton,
	ConfirmButton,
	DeleteButton,
	Input,
	StyledSubTitle,
} from '../styles/Styled';

const MomDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	min-width: 800px;
	width: 100%;
`;

const ContextDiv = styled.div`
	flex-direction: column;
	justify-content: center;
	width: 40%;
`;

const Box = styled.div`
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	justify-content: center;
	padding: 10px;
	transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		transform: translateY(-10px);
	}
`;

const FlexStartDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const SideBarDiv = styled.div`
	background: ${yellow};
	width: 250px;
	border-radius: 10%;
	padding: 20px;
	margin-left: 0.5rem;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const ModalDiv = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`;

const ModalBtnDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const ModalTittle = styled(StyledSubTitle)`
	margin-bottom: 30px;
`;

const Bold = styled.p`
	font-weight: 700;
	margin-right: 1rem;
`;

const P = styled.p``;

const Inp = styled(Input)`
	margin-bottom: 5px;
`;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #808080;
	margin: 2% 0;
`;

const GreenBtn = styled(SubmitButton)`
	margin-top: 0;
	padding: 1rem;
`;

const YellowBtn = styled(ConfirmButton)`
	margin-top: 0;
	padding: 0.8rem;
`;

const ConfirmBtn = styled(DeleteButton)`
	margin-top: 0;
	padding: 10px;
`;

const ModalBtn = styled.button`
	border: 1px black solid;
	border-radius: 10px;
	color: black;
	font-weight: 500;
	background-color: white;
	width: 120px;
	height: 40px;
	margin: 10px 0;
`;

// Memo ?????? : ????????????
const ReservationInfo = ({ payData }) => {
	const navigate = useNavigate();

	return (
		<>
			{payData && (
				<>
					<StyledSubTitle>?????? ??????</StyledSubTitle>
					<FlexStartDiv>
						<Bold>??????</Bold>
						<P>{payData.date}</P>
					</FlexStartDiv>
					<FlexStartDiv>
						<Bold>??????</Bold>
						<P>
							{payData.startTime} ~ {payData.endTime}
						</P>
					</FlexStartDiv>
					<FlexStartDiv>
						<Bold>??????</Bold>
						<P>{payData.headCount}???</P>
					</FlexStartDiv>
					<ButtonDiv>
						<GreenBtn onClick={() => navigate(-1)}>??????????????????</GreenBtn>
					</ButtonDiv>
				</>
			)}
		</>
	);
};

// Memo ?????? : SideBar
const SideBar = ({ payData }) => {
	const { farm, price, headCount, totalPrice } = payData;
	return (
		<>
			{payData && (
				<div>
					<StyledSubTitle>{farm}</StyledSubTitle>
					<Bold>?????? ????????????</Bold>
					<P>1??? ?????????</P>
					<TextDiv>
						<P>
							{price ? price.toLocaleString('ko-KR') : 0}??? X{headCount}
						</P>
						<P>{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}???</P>
					</TextDiv>
					<Line />
					<TextDiv>
						<StyledSubTitle>?????? ?????? ??????</StyledSubTitle>
						<StyledSubTitle>
							{totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}???
						</StyledSubTitle>
					</TextDiv>
				</div>
			)}
		</>
	);
};

// Memo ?????? : ?????? ??????
const PaymentInfo = () => {
	return (
		<>
			<Accordion
				style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
			>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<Bold>???????????? ?????? ??? ?????? ??????</Bold>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							?????? ????????? ????????? ?????? ???????????? ?????? ??? ???3??? ??????, ??????/??????
							????????? ???????????????.
						</P>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<Bold>?????? ?????? ??????</Bold>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							?????? ????????? 7??? ????????? ????????? ???????????????.??? ???????????? ?????? ?????????
							?????? ???????????? ???????????????.
							<br />
							<br /> *?????? ??? ?????? ??????*
							<br />
							?????????????????? 7??? ??? : 100% ??????
							<br />
							?????????????????? 3??? ??? : 50% ??????
							<br />
							?????????????????? 1??? ??? : ?????? ??????
						</P>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Line />
			<RowDiv>
				<div>
					<RiErrorWarningLine size="20" />
				</div>
				<P>?????? ????????? ??????????????????, ??? ????????? ???????????????.</P>
			</RowDiv>
		</>
	);
};

const Payment = () => {
	const location = useLocation();
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [payData, setPayData] = useState({});
	const [userData, setUserData] = useState({});
	const [selected, setSelected] = useState('card');
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(userData.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNum);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(userData.email);
	const [resData, setResData] = useState([]);
	const [personnel, setPersonnel] = useState(0);
	const [pay, setPay] = useState(false);

	//Memo ??????: ????????? ??? ????????? ??????
	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	const getUserData = async () => {
		try {
			const res = await userApi.get(`/api/myInfo`);
			const userData = await res.data;
			setUserData({
				name: userData.name,
				phoneNum: userData.phoneNum,
				email: userData.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(`/api/reserve`, {
				total_price: payData.totalPrice,
				payment: selected,
				name: name,
				phoneNum: phoneNumber,
				email: email,
				personnel: payData.headCount,
				time_id: payData.timeId,
			});
		} catch (e) {
			console.log(e);
		}
	};

	//Memo ??????: ????????? ??? ????????? ?????????
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [payData]);

	//Memo ?????? : ?????? ??? ?????? ?????? ?????? ????????? ????????? ?????? ??? ?????? ??????
	const submitHandler = async () => {
		getReserveData();
	};

	const getReserveData = async () => {
		try {
			const res = await userApi.get(`/api/timetables/${payData.farmId}`);
			const resData = await res.data;
			setResData(resData);
			for (let i = 0; i < resData.length; i++) {
				if (resData[i].id === payData.timeId) {
					setPersonnel(resData[i].personnel);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPay(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			dispatch(showModal());
		}
	}, [resData]);

	// Memo ?????? : ?????? ?????? ?????? handler
	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	return (
		<>
			<MomDiv>
				<ContextDiv>
					<Box>
						<ReservationInfo payData={payData}></ReservationInfo>
					</Box>
					<Box>
						<StyledSubTitle>????????? ??????</StyledSubTitle>
						<Bold>?????????</Bold>
						<TextDiv>
							{nameOpen ? (
								<Inp
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							) : (
								<P>{name}</P>
							)}
							{nameOpen ? (
								<YellowBtn onClick={() => setNameOpen(!nameOpen)}>
									??????
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setNameOpen(!nameOpen)}>
									??????
								</YellowBtn>
							)}
						</TextDiv>
						<Bold>?????????</Bold>
						<TextDiv>
							{phoneNumberOpen ? (
								<Inp
									type="text"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							) : (
								<P>{phoneNumber}</P>
							)}
							{phoneNumberOpen ? (
								<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									??????
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									??????
								</YellowBtn>
							)}
						</TextDiv>
						<Bold>?????????</Bold>
						<TextDiv>
							{emailOpen ? (
								<Inp
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							) : (
								<P>{email}</P>
							)}
							{emailOpen ? (
								<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
									??????
								</YellowBtn>
							) : (
								<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
									??????
								</YellowBtn>
							)}
						</TextDiv>
						<RowDiv>
							<div>
								<RiErrorWarningLine size="20" />
							</div>
							<P>???????????? ????????? ????????? ?????? ??? ???????????? ????????? ???????????????.</P>
						</RowDiv>
					</Box>
					<Box>
						<TextDiv>
							<StyledSubTitle>?????? ??????</StyledSubTitle>
							<Form.Select
								onChange={handleSelect}
								value={selected}
								style={{ width: '200px' }}
							>
								<option value="card" key="card">
									????????????
								</option>
								<option value="transfer" key="transfer">
									????????????
								</option>
							</Form.Select>
						</TextDiv>
						<PaymentInfo></PaymentInfo>
					</Box>
					<ButtonDiv>
						<ConfirmBtn onClick={submitHandler}>?????? ??? ??????</ConfirmBtn>
					</ButtonDiv>
				</ContextDiv>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
				{modalOpen && (
					<ModalContainer w="500px" h="280px">
						{pay ? (
							<ModalDiv>
								<ModalTittle>????????????</ModalTittle>
								<ModalBtn
									onClick={() => {
										dispatch(closeModal());
										navigate(`/`);
									}}
								>
									??????
								</ModalBtn>
								<ModalBtn
									onClick={() => {
										dispatch(closeModal());
										navigate(`/mypage/reservation`);
									}}
								>
									???????????? ??????
								</ModalBtn>
							</ModalDiv>
						) : (
							<ModalDiv>
								<ModalTittle>????????????</ModalTittle>
								<P>?????? ?????? ????????? ????????? ?????????????????????</P>
								<P>?????? ???????????? ??????????????????</P>
								<ModalBtnDiv>
									<ModalBtn
										type="button"
										onClick={() => {
											dispatch(closeModal());
											navigate(-1);
										}}
									>
										??????
									</ModalBtn>
								</ModalBtnDiv>
							</ModalDiv>
						)}
					</ModalContainer>
				)}
			</MomDiv>
		</>
	);
};

export default Payment;
