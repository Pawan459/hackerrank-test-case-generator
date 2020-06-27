const axios = require('axios');
const fs = require('fs');

const BASE_INPUT_URL = [
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input00.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292167&Signature=oYspyQphkH3AFrkjvm49I8bdOMs%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input01.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292169&Signature=tAhjuoYrKJCEUOJmNiv1QpEuqrg%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input02.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292173&Signature=NCTUZvUijo24%2FwuIXwgWiztZrDU%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input03.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292175&Signature=sUlQ3CQCJpD1Zr1UFmjURkW2fqk%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input04.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292178&Signature=8jxVFZ3AM5lwziAIetTiWNhqCR4%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input05.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292185&Signature=Yjf5d8p%2BbWJP6jR4UVK%2BEAQjmvU%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input06.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292190&Signature=BwTdm8Kjzz%2Bg1mqUIFYW%2FjtX%2BsE%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input07.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292196&Signature=VKll431WDiCet8P7FRPsyg4zsO0%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input08.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292200&Signature=JbA%2FHvr0V%2FZgUA8SEH8OCJvrQ6I%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input09.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292206&Signature=1N5fH13v2y%2FrQAXdBGW0njzBd38%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input10.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292211&Signature=o0TWZdn8eobCm%2FT6Fypmlx9xim0%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input11.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292216&Signature=cgj%2F6FC3xJKh7b7spJEnP%2FaTS54%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input12.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292223&Signature=W7KmiWMGxBZ5AWU5bxIPy4ePYyw%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input13.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292228&Signature=%2F8OHer7vkzEo9b9yvgqWyGVNfDI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input14.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292233&Signature=Yf%2F6BGyfsyOkY8utzoFWhzM4wGQ%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input15.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292237&Signature=D0DFEZI4rAWICG6urzA%2BO%2Fc%2FknI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input16.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292243&Signature=%2FFmYUoN8UuJpIMecvWU%2B4SnImEs%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input17.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292246&Signature=y096uVF5esVGhCQ7kRifTYhIvcY%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/input18.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292249&Signature=WwxuoepD0OoQpMQELbi9lcaSHq8%3D&response-content-type=text%2Fplain'
];
const BASE_OUTPUT_URL = [
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output00.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292822&Signature=%2FDfdUZ6aeeakPzSUgUZTojskVYI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output01.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292829&Signature=Mu3ILIAssr7rLD2ogTbMOytSFTg%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output02.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292834&Signature=rlYW1VuSstXx5dK64KPCwpvwukI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output03.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593292838&Signature=UKaZHeRwkAuMnpwJ%2FpMdGLEIvAI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output04.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296608&Signature=7MjkZdPRU2OXVgRNlhZBb9jR6Z0%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output05.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296618&Signature=gcQjbyoqUyY63o9sACkD6WAvpBI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output06.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296628&Signature=Xhu8uxJv119O4UUwu%2BSZ3DLiiY8%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output07.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296637&Signature=LXbMtZb5W6xE8PboymRm7YwvEFo%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output08.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296644&Signature=r05X%2Ff2fIpdKsEPIj3y8kOu5xW0%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output09.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296654&Signature=on287%2BBTWxCZrRAgPuhoqmerKTw%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output10.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296666&Signature=eVmU9d4M%2FeBCb0YFkuppBlxiifI%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output11.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296673&Signature=FoORsZ1X%2FbB%2BNhRpMaGBVb3ZTVs%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output12.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296679&Signature=%2F0DonYKnPUZHIugxC2x2tq5PY2w%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output13.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296688&Signature=GDWQ099bWZH21itWP20d%2Flnjh7c%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output14.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296699&Signature=SR4maPfhjd3%2B3W8e0RDUeQqFk1k%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output15.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296706&Signature=CDPfbdmWI%2BxzjqSEb4yK%2BxMnQKY%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output16.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296711&Signature=cixW1vKDxcvo9fG4EsbX6e6lOEo%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output17.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296714&Signature=QxAgvwGaPPUuFF1CMQIun701XSY%3D&response-content-type=text%2Fplain',
    'https://hr-testcases-us-east-1.s3.amazonaws.com/2619/output18.txt?AWSAccessKeyId=AKIAJ4WZFDFQTZRGO3QA&Expires=1593296717&Signature=GtITNu%2F8vW5ONSnLDmCFwMlj20A%3D&response-content-type=text%2Fplain'
];

BASE_INPUT_URL.map((url, index) => {
    axios.get(url)
    .then(res => {
        fs.promises.mkdir('input',{recursive:true}).then(value => {
            fs.writeFile(`input\\input${index}.txt`,res.data,()=>{
                console.log(`Input${index} wriiten`)
            });
        })
        .catch(err => console.log('error in creating directory',err, index));
    })
    .catch(err => console.log('Facing error in input url',err));
});

BASE_OUTPUT_URL.map((url, index) => {
    axios.get(url)
    .then(res => {
        fs.promises.mkdir('output',{recursive:true}).then(value => {
            fs.writeFile(`output\\output${index}.txt`,res.data, ()=>{
                console.log(`Output${index} written`)
            });
        })
        .catch(err => console.log('error in creating output directory',err, index));
    })
    .catch(err => console.log('Facing error in input url',err));
});


console.log('i am working');