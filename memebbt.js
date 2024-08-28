let tronWeb, userAddress;
let stakingContracts = [];
const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

// Contract Addresses
const tokenContracts = {
    token1: 'TGyZUWrL97mmmYJwrC7ZCLVrhbzvHmmWPL',
};

const stakingContractAddresses = {
    token1: 'TXtzEHaSk1FpfYQ2Vwvf8RmKG7jpPY2YYC',
};

const stakingContractAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ownerWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_dailyReward",
                "type": "uint256"
            }
        ],
        "name": "setDailyReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stakingToken",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "name": "RewardClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "OwnerWithdrawn",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "dailyReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastUpdateTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardPerTokenStored",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardsPerMinute",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stakingToken",
        "outputs": [
            {
                "internalType": "contract ITRC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalClaimed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewPendingReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewStakedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "viewTotalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewTotalClaimedByUser",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewStakedPercentage",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const tokenContractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MODE_NORMAL",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MODE_TRANSFER_CONTROLLED",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MODE_TRANSFER_RESTRICTED",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "_mode",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "v",
                "type": "uint256"
            }
        ],
        "name": "setMode",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('connect-button').addEventListener('click', connectWallet);
    if (await checkTronLinkInstalled()) {
        await initializeTronWeb();
        await updateAllUI();
        setInterval(updateAllUI, 60000); // Update UI every minute
    }
});

// Check if TronLink is installed
async function checkTronLinkInstalled() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(interval);
                resolve(true);
            }
        }, 1000);
    });
}

// Connect the wallet using TronLink
async function connectWallet() {
    if (await checkTronLinkInstalled()) {
        await initializeTronWeb();
    } else {
        console.error('TronLink is not installed.');
    }
}

// Initialize TronWeb and the contracts
async function initializeTronWeb() {
    try {
        tronWeb = window.tronWeb;
        userAddress = tronWeb.defaultAddress.base58;

        console.log('Connected to TronLink.');
        console.log('User Address:', userAddress);

        document.getElementById('connect-button').style.display = 'none';

        // Initialize staking contracts
        for (let token in stakingContractAddresses) {
            stakingContracts[token] = await tronWeb.contract(stakingContractAbi, stakingContractAddresses[token]);
        }

        await updateAllUI();
    } catch (error) {
        console.error('Error initializing TronWeb:', error);
    }
}

// Update the entire UI with current data
async function updateAllUI() {
    try {
        for (let token in stakingContracts) {
            await updateTokenUI(token);
        }
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Update UI for a specific token
async function updateTokenUI(token) {
    try {
        await updateDailyReward(token);
        await updateClaimableRewards(token);
        await updateStakedAmount(token);
        await updateStakedPercentage(token);
        await updateTotalClaimed(token);
        await updateTotalStaked(token);
        await updateTotalClaimedAllUsers(token);
    } catch (error) {
        console.error(`Error updating UI for ${token}:`, error);
    }
}

// Function to update the total staked amount
async function updateTotalStaked(token) {
    try {
        const totalStakedRaw = await stakingContracts[token].methods.viewTotalStaked().call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const totalStaked = totalStakedRaw / Math.pow(10, decimals);
        document.getElementById(`total-staked-${token}`).innerText = formatNumber(totalStaked) + ' $SUNRAT';
    } catch (error) {
        console.error(`Error fetching total staked TRX for ${token}:`, error);
    }
}

// Function to update the total claimed by all users
async function updateTotalClaimedAllUsers(token) {
    try {
        const totalClaimedAll = await stakingContracts[token].methods.totalClaimed().call();
        document.getElementById(`total-claimed-all-${token}`).innerText = formatNumber(tronWeb.fromSun(totalClaimedAll)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching total claimed TRX for all users for ${token}:`, error);
    }
}

// Function to update the daily reward
async function updateDailyReward(token) {
    try {
        const dailyReward = await stakingContracts[token].methods.dailyReward().call();
        const dailyRewardInTrx = tronWeb.fromSun(dailyReward);
        document.getElementById(`daily-reward-${token}`).innerText = `Daily TRX Reward: ${dailyRewardInTrx} TRX`;
    } catch (error) {
        console.error(`Error fetching daily reward for ${token}:`, error);
        document.getElementById(`daily-reward-${token}`).innerText = 'Daily TRX Reward: Unable to fetch';
    }
}

// Function to update claimable rewards
async function updateClaimableRewards(token) {
    try {
        const claimableRewards = await stakingContracts[token].methods.viewPendingReward(userAddress).call();
        document.getElementById(`claimable-rewards-${token}`).innerText = formatNumber(tronWeb.fromSun(claimableRewards)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching claimable rewards for ${token}:`, error);
    }
}

// Function to update the staked amount
async function updateStakedAmount(token) {
    try {
        const stakedAmountRaw = await stakingContracts[token].methods.viewStakedAmount(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const stakedAmount = stakedAmountRaw / Math.pow(10, decimals);
        document.getElementById(`staked-amount-${token}`).innerText = formatWholeNumber(stakedAmount) + ' $SUNRAT';
    } catch (error) {
        console.error(`Error fetching staked amount for ${token}:`, error);
    }
}

// Function to update the staked percentage
async function updateStakedPercentage(token) {
    try {
        const stakedAmount = await stakingContracts[token].methods.viewStakedAmount(userAddress).call();
        const totalStaked = await stakingContracts[token].methods.viewTotalStaked().call();
        let stakedPercentage = 0;

        if (totalStaked > 0) {
            stakedPercentage = (stakedAmount / totalStaked) * 100;
        }

        document.getElementById(`staked-percentage-${token}`).innerText = stakedPercentage.toFixed(2) + ' %';
    } catch (error) {
        console.error(`Error fetching staked percentage for ${token}:`, error);
    }
}

// Function to update the total claimed amount by the user
async function updateTotalClaimed(token) {
    try {
        const totalClaimed = await stakingContracts[token].methods.viewTotalClaimedByUser(userAddress).call();
        document.getElementById(`total-claimed-${token}`).innerText = formatNumber(tronWeb.fromSun(totalClaimed)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching total claimed TRX for ${token}:`, error);
    }
}

// Event listener for staking
document.getElementById('stake-button-token1').addEventListener('click', async () => {
    const stakeAmount = document.getElementById('stake-amount-token1').value;
    if (stakeAmount) {
        try {
            await stakeTokens('token1', stakeAmount);
            setTimeout(async () => {
                await updateAllUI(); // Update the UI 4 seconds after staking
            }, 4000);
        } catch (error) {
            console.error('Error staking tokens:', error);
        }
    }
});

// Event listener for unstaking
document.getElementById('unstake-button-token1').addEventListener('click', async () => {
    try {
        await unstakeTokens('token1');
        setTimeout(async () => {
            await updateAllUI(); // Update the UI 4 seconds after unstaking
        }, 4000);
    } catch (error) {
        console.error('Error unstaking tokens:', error);
    }
});

// Event listener for claiming rewards
document.getElementById('claim-rewards-button-token1').addEventListener('click', async () => {
    try {
        await claimRewards('token1');
        setTimeout(async () => {
            await updateAllUI(); // Update the UI 4 seconds after claiming rewards
        }, 4000);
    } catch (error) {
        console.error('Error claiming rewards:', error);
    }
});

// Function to stake tokens
async function stakeTokens(token, amount) {
    try {
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const amountToStake = BigInt(amount) * BigInt(Math.pow(10, decimals));

        await tokenContract.methods.approve(stakingContractAddresses[token], maxUint256).send();
        await stakingContracts[token].methods.stake(amountToStake.toString()).send();

        await updateStakedAmount(token);
    } catch (error) {
        console.error(`Error staking tokens for ${token}:`, error);
    }
}

// Function to unstake tokens
async function unstakeTokens(token) {
    try {
        const unstakeAmount = document.getElementById(`stake-amount-token1`).value;
        if (unstakeAmount) {
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContracts[token]);
            const decimals = await tokenContract.methods.decimals().call();

            const amountToUnstake = BigInt(unstakeAmount) * BigInt(Math.pow(10, decimals));

            await stakingContracts[token].methods.withdraw(amountToUnstake.toString()).send();
            await updateStakedAmount(token);
        }
    } catch (error) {
        console.error(`Error unstaking tokens for ${token}:`, error);
    }
}

// Function to claim rewards
async function claimRewards(token) {
    try {
        await stakingContracts[token].methods.claimReward().send();
        await updateClaimableRewards(token);
        await updateTotalClaimed(token);
    } catch (error) {
        console.error(`Error claiming rewards for ${token}:`, error);
    }
}

// Format number with commas
function formatNumber(num) {
    return parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Format whole number with commas
function formatWholeNumber(num) {
    return Math.floor(parseFloat(num)).toLocaleString('en-US');
}

// Function to switch language
function switchLanguage(language) {
    if (language === 'zh') {
        window.location.href = 'usdt_zh.html';
    } else {
        window.location.href = 'usdt.html';
    }
}

