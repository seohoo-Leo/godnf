import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useServers } from '../../../hooks/useServers';  // 서버 데이터를 가져오는 커스텀 훅
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSelectedInfo from '../../../store/useSelectedInfo';

const CharacterSearch = () => {
  
  // 서버 데이터를 가져오는 커스텀 훅
  const { data, isLoding, isError, error } = useServers();
  const navigate = useNavigate();  // 페이지 네비게이션을 위한 훅
  const [isLoading, setLoading] = useState(false);  // 로딩 상태 관리
  const [smShow, setSmShow] = useState(false);  // 오류 모달 상태 관리
  const {selectedName, selectedServer, selectedServerId, setSelectedName, setSelectedServer, setSelectedServerId} = useSelectedInfo();


  // 캐릭터명 입력 시 선택된 캐릭터명을 상태에 저장
  const inputName = (event) => {
    let key_word = event.target.value;
    setSelectedName(key_word);  // 입력한 이름으로 상태 업데이트
  };

  // Enter 키로 검색 시 실행되는 함수
  const searchEnter = (event) => {
    if (event.key === "Enter") {  // Enter 키가 눌리면
      event.preventDefault();  // 기본 동작 방지 (폼 제출 등)
      if (selectedName === "") {  // 캐릭터명이 비어있는 경우
        setSmShow(true);  // 오류 메시지 모달 띄우기
      } else {
        // 캐릭터 이름과 서버 ID를 URL 쿼리 파라미터로 전달하여 검색 페이지로 이동
        navigate(`/servers/characters?serverId=${selectedServerId}&characterName=${selectedName}`);
      }
    }
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const searchButton = () => {
    setLoading(true);  // 로딩 시작
    if (selectedName === "") {  // 캐릭터명이 비어있는 경우
      setSmShow(true);  // 오류 메시지 모달 띄우기
    } else {
      // 캐릭터 이름과 서버 ID를 URL 쿼리 파라미터로 전달하여 검색 페이지로 이동
      navigate(`/servers/characters?serverId=${selectedServerId}&characterName=${selectedName}`);
    }
  };

  // 로딩 상태에 따른 2초 후 로딩 종료 시뮬레이션
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);  // 2초 대기 후
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);  // 로딩 종료
      });
    }
  }, [isLoading]);

  // 서버 선택 시 해당 서버명과 서버 ID 업데이트
  const userServer = (server) => {
    // 서버명이 "all"인 경우, 전체 서버로 처리
    server === "all" ? setSelectedServer("전체 서버") : setSelectedServer(server.serverName);
    server === "all" ? setSelectedServerId("all") : setSelectedServerId(server.serverId);
    console.log("서버 :", server);  // 선택된 서버 정보 콘솔에 출력
  };

  // 데이터가 로딩 중일 경우 로딩 메시지 출력
  if (isLoding) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="CSHTOP" style={{display: 'flex', justifyContent: "center"}}>
      {/* 검색 폼 */}
      <Form>
        <Form.Group as={Row} controlId="formPlaintextPassword" style={{alignItems: "center", justifyContent: "center"}}>
          <Form.Label column>
            {/* 서버 선택 Dropdown */}
            <Dropdown style={{display: "flex", justifyContent: "flex-end"}}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width: '200px'}}>
                {selectedServer}  {/* 현재 선택된 서버 표시 */}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: '200px', maxHeight: '200px', overflowY: 'auto', textAlign: "center"}}>
                {/* 전체 서버 선택 */}
                <Dropdown.Item onClick={() => userServer("all")}>
                  전체서버
                </Dropdown.Item>
                {/* 서버 목록 동적으로 렌더링 */}
                {data?.map((server, index) => (
                  <Dropdown.Item key={index} onClick={() => userServer(server)}>
                    {server.serverName}  {/* 서버 이름 */}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Label>
          <Col>
            {/* 캐릭터명 입력 필드 */}
            <Form.Control 
              type="text" 
              placeholder="캐릭터명" 
              style={{alignItems: "center", width: "300px"}} 
              onChange={inputName} 
              onKeyPress={searchEnter}  
            />
          </Col>
          <Col>
            {/* 검색 버튼 */}
            <Button 
              variant="outline-primary"
              disabled={isLoading}  
              onClick={!isLoading ? searchButton : null}  
            >
              {isLoading ? 'Loading…' : '검색'}  {/* 로딩 중일 경우 버튼 텍스트 변경 */}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {/* 오류 메시지를 띄우는 모달 */}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}  
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>서버와 캐릭터명을 확인해주세요</Modal.Body>  {/* 오류 메시지 */}
      </Modal>
    </div>
  );
}

export default CharacterSearch;