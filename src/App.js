import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import background from "./styles/backgroundbase.png";
import background2 from "./styles/backgroundbase2.png";


const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: "Inter", sans-serif;
  text-shadow: -1px -1px 0 #000, 2px -2px 0 #000, -1px 1px 0 #000, 2px 2px 0 #000;
  letter-spacing: 1px;
  border-radius: 40px;
  border: none;
  background: url("/config/images/baseButton3.png");
  padding: 24px;
  font-weight: bold;
  font-size: 19px;
  cursor: pointer;
  color: var(--primary);
  width: 160px;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledButton2 = styled.button`
  background: url("/config/images/tw.png");
  cursor: pointer;
  border: none;
  width: 50px;
  height: 50px;
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const StyledLogo = styled.img`
  width: 300px;

  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  width: 100%;
  transition: width 0.5s;
  cursor: pointer;
`;

export const StyledImg3 = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  width: 100%;
  transition: width 0.5s;
`;

export const StyledImg4 = styled.img`
  width: 80px;
  cursor: pointer;
`;

export const StyledImg2 = styled.img`
  background-color: var(--accent);
  width: 400px;
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`0.006 ETH COST EACH BASEMIGOS`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });


  const claimNFTs = () => {
    let cost = 6000000000000000;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    let totalCostWeiNum = cost * mintAmount
    let trueCost = BigInt(totalCostWeiNum).toString();
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: trueCost,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Something went wrong. Try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `You have minted ${mintAmount} ${CONFIG.NFT_NAME}!`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  };

const handleMintfun = () => {
    window.open(
      'https://mint.fun/base/0x5a714f23236202c7b8d60b9c97e570b07ce31695',
      '_blank' // <- This is what makes it open in a new window.
    );
  };

const handleTw = () => {
    window.open(
      'https://twitter.com/BasemigosOnBase',
      '_blank' // <- This is what makes it open in a new window.
    );
  };

const handleTg = () => {
    window.open(
      'https://t.me/Basemigos',
      '_blank' // <- This is what makes it open in a new window.
    );
  };

 const [showMobileWarning, setShowMobileWarning] = useState(false)

useEffect(() => {
  if(window.innerWidth <= 800)
    setShowMobileWarning(true)
}, [])


  return (
    <s.Screen>

      <div style={{display:"flex", 
      backgroundImage: `url(${background2})`,
      backgroundAttachment: "fixed",
      backgroundPosition: "center"
       }}>
      <s.Container
        flex={1}
        ai={"center"}>
      <s.SpacerLargeX />


      <s.TextTitle
            style={{
              textAlign:"right",
              fontSize: 120,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            BASEMIGOS
      </s.TextTitle>
      <s.SpacerMedium />
      <s.TextSubTitle
            style={{
              textAlign:"right",
              fontSize: 30,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            2222 unique crypto investors on the Base blockchain with commercial rights.
      </s.TextSubTitle>

      <div class="container" style={{display:"flex", marginLeft:"-5px"}}>
      <div class="card" onClick={handleScroll} >
      <ResponsiveWrapper test>
        <s.SpacerLarge />
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          image={CONFIG.SHOW_BACKGROUND ? "/config/images/baseButton.png" : null}
          style={{
            padding: 10,
            borderRadius: 30,
            boxShadow: "2px 10px 10px 10px rgba(0,0,0,0.2)",
            cursor:"pointer",
            width:"280px", 
            height:"100px",

          }}
          
        >
          <s.TextTitle2
            style={{
              textAlign: "center",
              letterSpacing: 3,
              fontSize: 30,
              color: "var(--accent-text)",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 3px 0 #000, 3px 3px 0 #000",
            }}
          >
            MINT LIVE
          </s.TextTitle2>
        </s.Container>

      </ResponsiveWrapper>
      </div>
<div class="card" style={{marginLeft:"70px"}} onClick={handleMintfun}>
      <ResponsiveWrapper test>
        <s.SpacerLarge />
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          image={CONFIG.SHOW_BACKGROUND ? "/config/images/baseButton.png" : null}
          style={{
            padding: 10,
            borderRadius: 30,
            boxShadow: "2px 10px 10px 10px rgba(0,0,0,0.2)",
            cursor:"pointer",
            width:"280px", 
            height:"100px",

          }}
          
        >
          <s.TextTitle2
            style={{
              textAlign: "center",
              letterSpacing: 3,
              fontSize: 30,
              color: "var(--accent-text)",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 3px 0 #000, 3px 3px 0 #000",
            }}
          >
            MINT.FUN
          </s.TextTitle2>
        </s.Container>

      </ResponsiveWrapper>
      </div>
      
      </div>

<div class="card" onClick={handleMintfun}>
      <ResponsiveWrapper test>
        <s.SpacerLarge />
        <s.Container
          flex={1}
          jc={"center"}
          ai={"center"}
          image={CONFIG.SHOW_BACKGROUND ? "/config/images/baseButton.png" : null}
          style={{
            padding: 10,
            borderRadius: 30,
            boxShadow: "2px 10px 10px 10px rgba(0,0,0,0.2)",
            cursor:"pointer",
            width:"260px", 
            height:"80px",

          }}
          
        >
          <s.TextTitle2
            style={{
              textAlign: "center",
              letterSpacing: 3,
              fontSize: 28,
              color: "var(--accent-text)",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 3px 0 #000, 3px 3px 0 #000",
            }}
          >
          OPENSEA
          </s.TextTitle2>
        </s.Container>

      </ResponsiveWrapper>
      </div>

      <s.SpacerLargeX />
      <s.SpacerLargeX />
      <s.SpacerLargeX />


      <StyledImg3
              alt={"logo"}
              src={"/config/images/basemigos.jpg"}
            />

<s.SpacerLargeX />
<s.SpacerMedium />

<s.TextTitle
            style={{
              textAlign:"right",
              fontSize: 120,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            COMMERCIAL RIGHTS
      </s.TextTitle>
      <s.SpacerMedium />
      <s.TextSubTitle
            style={{
              textAlign:"center",
              fontSize: 30,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            Basemigos holders are granted the same commercial rights as Yuga Labs provided for CryptoPunks.
      </s.TextSubTitle>
      <s.SpacerMedium />
      <s.TextSubTitle
            style={{
              textAlign:"center",
              fontSize: 30,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            The Basemigos license is available <a href="https://docdro.id/ybD8hTX" target="_blank">here</a>
      </s.TextSubTitle>
      <s.SpacerLargeX />
      <s.SpacerLargeX />


      <StyledImg3
              alt={"logo"}
              src={"/config/images/basemigos.jpg"}
            />

<s.SpacerLargeX />

<s.Container
        flex={1}
        ai={"center"}>
      <s.TextTitle
            style={{
              textAlign:"center",
              fontSize: 60,
              fontWeight: "bold",
              color: "var(--accent-text)",
            }}
          >
            Mint your Basemigos
      </s.TextTitle>
      <s.SpacerLargeX />

      <div class="container" style={{display:"flex"}}>
      <div class="card">
      <StyledImg2
              alt={"logo"}
              src={"/config/images/gif.gif"}
              style={{
                borderRadius: 70,
              }}
            />         
      </div>


      <s.SpacerLargeX />
      <div class="card" style={{paddingTop: "135px"}}>
      <ResponsiveWrapper test>
        {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>

                
              </>
            ) : (
              <>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"} style={{
                    paddingTop:"30px"
                  }}>

                    <StyledButton
                    style={{
                      boxShadow: "2px 10px 10px 8px rgba(0,0,0,0.2)",
                    }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    
                    {blockchain.errorMsg !== "" ? (
                      <>
                    <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "WAIT" : "MINT"}
                      </StyledButton>
                      
                    </s.Container>
                  </>
                )}
              </>
            )}
      </ResponsiveWrapper>
      </div>
      
      
      </div>
     <s.SpacerLargeX />
      <s.SpacerLarge />
      </s.Container>

      <div class="container" style={{display:"flex"}}>

      <div class="card" onClick={handleTg} style={{display:"flex"}}> 
                   <StyledImg4
              src={"/config/images/tg.png"}
            />
</div>
<div class="card" onClick={handleTw} style={{marginLeft:"80px"}}> 
            <StyledImg4
              src={"/config/images/tw.png"}
            />     
</div>  
</div>
<s.SpacerLargeX />
      </s.Container>
      </div>
      
    </s.Screen>
  );
}

export default App;
