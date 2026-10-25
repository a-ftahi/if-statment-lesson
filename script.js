/**
 * GRADE 8 ICT: IF & IF/ELSE STATEMENTS INTERACTIVE LESSON SCRIPT
 * Ihsan Schools - Future Explorers Grade 8
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. REVISION: MEMORY & TYPE CASTING LAB
       ======================================================== */
    const revVarName = document.getElementById('revVarName');
    const revVarValue = document.getElementById('revVarValue');
    const castRadios = document.querySelectorAll('input[name="castType"]');
    const revPseudocodeOut = document.getElementById('revPseudocodeOut');
    const revPythonOut = document.getElementById('revPythonOut');
    const revMemType = document.getElementById('revMemType');
    const revMemVal = document.getElementById('revMemVal');
    const revMemNote = document.getElementById('revMemNote');
    const memoryPreviewVal = document.getElementById('memoryPreviewVal');

    function updateRevisionLab() {
        if (!revVarName || !revVarValue) return;

        let varName = revVarName.value.trim() || 'myVar';
        // Clean up identifier (no spaces)
        varName = varName.replace(/\s+/g, '_');
        const rawVal = revVarValue.value;
        const selectedCast = document.querySelector('input[name="castType"]:checked')?.value || 'int';

        // Update preview in Concept Card 1
        if (memoryPreviewVal) {
            memoryPreviewVal.textContent = rawVal !== '' ? rawVal : '0';
        }

        // Pseudocode is language-independent: INPUT varName
        revPseudocodeOut.textContent = `INPUT ${varName}`;

        if (selectedCast === 'int') {
            revPythonOut.textContent = `${varName} = int(input("Enter ${varName}: "))`;
            revMemType.textContent = 'Type: Integer (Whole Number)';
            const parsed = parseInt(rawVal, 10);
            revMemVal.textContent = isNaN(parsed) ? 'NaN (Not a Number)' : parsed;
            revMemNote.textContent = '✅ Numeric: Ready for comparisons like >, <, >=, <=';
            revMemNote.style.color = 'var(--emerald)';
        } else {
            revPythonOut.textContent = `${varName} = input("Enter ${varName}: ")`;
            revMemType.textContent = 'Type: String (Text)';
            revMemVal.textContent = `"${rawVal}"`;
            revMemNote.textContent = '⚠️ Text: Compared alphabetically, not by mathematical value!';
            revMemNote.style.color = 'var(--amber)';
        }
    }

    if (revVarName && revVarValue) {
        revVarName.addEventListener('input', updateRevisionLab);
        revVarValue.addEventListener('input', updateRevisionLab);
        castRadios.forEach(radio => radio.addEventListener('change', updateRevisionLab));
        updateRevisionLab();
    }


    /* ========================================================
       2. DECISION GATE SIMULATOR (RAIN & UMBRELLA)
       Supports both Single-Branch (IF) and Two-Way (IF/ELSE)
       ======================================================== */
    const btnGateSingle = document.getElementById('btnGateSingle');
    const btnGateDual = document.getElementById('btnGateDual');
    const btnRaining = document.getElementById('btnRaining');
    const btnSunny = document.getElementById('btnSunny');
    const gateCodeSnippet = document.getElementById('gateCodeSnippet');
    const diamondStatus = document.getElementById('diamondStatus');
    const branchTrue = document.getElementById('branchTrue');
    const branchFalse = document.getElementById('branchFalse');
    const actionUmbrella = document.getElementById('actionUmbrella');
    const actionSunglasses = document.getElementById('actionSunglasses');
    const branchSkipLine = document.getElementById('branchSkipLine');
    const gateConsoleScreen = document.getElementById('gateConsoleScreen');

    let currentGateMode = 'single'; // 'single' | 'dual'
    let currentIsRaining = true;

    function updateGateVisuals() {
        // 1. Update snippet code
        if (currentGateMode === 'single') {
            gateCodeSnippet.innerHTML = `<code><span class="py-keyword">if</span> isRaining == <span class="py-bool">True</span>:
    <span class="py-func">print</span>(<span class="py-str">"Take an umbrella! ☂️"</span>)
<span class="py-func">print</span>(<span class="py-str">"Walk outside to school! 🎒"</span>)</code>`;
            if (branchSkipLine) branchSkipLine.style.display = 'block';
            if (actionSunglasses) actionSunglasses.style.display = 'none';
        } else {
            gateCodeSnippet.innerHTML = `<code><span class="py-keyword">if</span> isRaining == <span class="py-bool">True</span>:
    <span class="py-func">print</span>(<span class="py-str">"Take an umbrella! ☂️"</span>)
<span class="py-keyword">else</span>:
    <span class="py-func">print</span>(<span class="py-str">"Wear sunglasses &amp; sunscreen! 🕶️☀️"</span>)
<span class="py-func">print</span>(<span class="py-str">"Walk outside to school! 🎒"</span>)</code>`;
            if (branchSkipLine) branchSkipLine.style.display = 'none';
            if (actionSunglasses) actionSunglasses.style.display = 'block';
        }

        // 2. Weather state & branch highlights
        if (currentIsRaining) {
            btnRaining?.classList.add('active');
            btnSunny?.classList.remove('active');
            if (diamondStatus) {
                diamondStatus.textContent = 'TRUE';
                diamondStatus.style.color = 'var(--cyan)';
            }

            if (branchTrue) branchTrue.style.opacity = '1';
            if (actionUmbrella) {
                actionUmbrella.style.opacity = '1';
                actionUmbrella.style.transform = 'scale(1.05)';
            }

            if (branchFalse) branchFalse.style.opacity = '0.35';
            if (actionSunglasses) {
                actionSunglasses.style.opacity = '0.35';
                actionSunglasses.style.transform = 'scale(1)';
            }

            if (gateConsoleScreen) {
                gateConsoleScreen.innerHTML = `
                    <div class="console-line text-cyan">&gt; Take an umbrella! ☂️</div>
                    <div class="console-line text-white">&gt; Walk outside to school! 🎒</div>
                `;
            }
        } else {
            btnSunny?.classList.add('active');
            btnRaining?.classList.remove('active');
            if (diamondStatus) {
                diamondStatus.textContent = 'FALSE';
                diamondStatus.style.color = 'var(--amber)';
            }

            if (branchTrue) branchTrue.style.opacity = '0.35';
            if (actionUmbrella) {
                actionUmbrella.style.opacity = '0.35';
                actionUmbrella.style.transform = 'scale(1)';
            }

            if (branchFalse) branchFalse.style.opacity = '1';

            if (currentGateMode === 'single') {
                if (gateConsoleScreen) {
                    gateConsoleScreen.innerHTML = `
                        <div class="console-line text-white">&gt; Walk outside to school! 🎒</div>
                        <div class="console-line text-muted" style="font-size:0.8rem; margin-top:0.35rem;">[Notice: Single IF has no else branch &rarr; "Take an umbrella" was skipped!]</div>
                    `;
                }
            } else {
                if (actionSunglasses) {
                    actionSunglasses.style.opacity = '1';
                    actionSunglasses.style.transform = 'scale(1.05)';
                }
                if (gateConsoleScreen) {
                    gateConsoleScreen.innerHTML = `
                        <div class="console-line text-amber" style="color:var(--amber);">&gt; Wear sunglasses &amp; sunscreen! 🕶️☀️</div>
                        <div class="console-line text-white">&gt; Walk outside to school! 🎒</div>
                        <div class="console-line text-muted" style="font-size:0.8rem; margin-top:0.35rem;">[Notice: Condition was False &rarr; The ELSE branch executed!]</div>
                    `;
                }
            }
        }
    }

    if (btnGateSingle && btnGateDual) {
        btnGateSingle.addEventListener('click', () => {
            currentGateMode = 'single';
            btnGateSingle.classList.add('active');
            btnGateDual.classList.remove('active');
            updateGateVisuals();
        });
        btnGateDual.addEventListener('click', () => {
            currentGateMode = 'dual';
            btnGateDual.classList.add('active');
            btnGateSingle.classList.remove('active');
            updateGateVisuals();
        });
    }

    if (btnRaining && btnSunny) {
        btnRaining.addEventListener('click', () => {
            currentIsRaining = true;
            updateGateVisuals();
        });
        btnSunny.addEventListener('click', () => {
            currentIsRaining = false;
            updateGateVisuals();
        });
        updateGateVisuals();
    }


    /* ========================================================
       3. COMPARISON OPERATORS SANDBOX
       ======================================================== */
    const opLeftVal = document.getElementById('opLeftVal');
    const opRightVal = document.getElementById('opRightVal');
    const opSelector = document.getElementById('opSelector');
    const sandboxFormula = document.getElementById('sandboxFormula');
    const sandboxBadge = document.getElementById('sandboxBadge');
    const sandboxReason = document.getElementById('sandboxReason');

    function evaluateOperatorSandbox() {
        if (!opLeftVal || !opRightVal || !opSelector) return;

        const leftRaw = opLeftVal.value.trim();
        const rightRaw = opRightVal.value.trim();
        const op = opSelector.value;

        // Try numeric conversion
        const leftNum = Number(leftRaw);
        const rightNum = Number(rightRaw);
        const isNumeric = !isNaN(leftNum) && !isNaN(rightNum) && leftRaw !== '' && rightRaw !== '';

        let result = false;
        let explanation = '';

        const val1 = isNumeric ? leftNum : leftRaw;
        const val2 = isNumeric ? rightNum : rightRaw;

        switch (op) {
            case '==':
                result = (val1 == val2);
                explanation = result
                    ? `Both sides are equal (${val1} matches ${val2}).`
                    : `The two values are not equal (${val1} is different from ${val2}).`;
                break;
            case '!=':
                result = (val1 != val2);
                explanation = result
                    ? `The values are not equal (${val1} differs from ${val2}).`
                    : `Both sides are identical.`;
                break;
            case '>':
                result = (val1 > val2);
                explanation = result
                    ? `${val1} is strictly greater than ${val2}.`
                    : `${val1} is NOT greater than ${val2}.`;
                break;
            case '<':
                result = (val1 < val2);
                explanation = result
                    ? `${val1} is strictly less than ${val2}.`
                    : `${val1} is NOT less than ${val2}.`;
                break;
            case '>=':
                result = (val1 >= val2);
                explanation = result
                    ? `${val1} is greater than or equal to ${val2}.`
                    : `${val1} is strictly smaller than ${val2}.`;
                break;
            case '<=':
                result = (val1 <= val2);
                explanation = result
                    ? `${val1} is less than or equal to ${val2}.`
                    : `${val1} is strictly greater than ${val2}.`;
                break;
        }

        sandboxFormula.textContent = `${isNumeric ? val1 : `"${val1}"`} ${op} ${isNumeric ? val2 : `"${val2}"`}`;

        if (result) {
            sandboxBadge.textContent = 'TRUE';
            sandboxBadge.className = 'result-badge true-glow';
        } else {
            sandboxBadge.textContent = 'FALSE';
            sandboxBadge.className = 'result-badge false-glow';
        }

        sandboxReason.textContent = explanation;
    }

    if (opLeftVal && opRightVal && opSelector) {
        opLeftVal.addEventListener('input', evaluateOperatorSandbox);
        opRightVal.addEventListener('input', evaluateOperatorSandbox);
        opSelector.addEventListener('change', evaluateOperatorSandbox);
        evaluateOperatorSandbox();
    }


    /* ========================================================
       4. PSEUDOCODE STEP-THROUGH INSPECTOR
       Supports Algorithm 1 (Single IF) and Algorithm 2 (IF/ELSE)
       ======================================================== */
    const stepNumInput = document.getElementById('stepNumInput');
    const btnRunStepper = document.getElementById('btnRunStepper');
    const dispStepVal = document.getElementById('dispStepVal');
    const dispStepCond = document.getElementById('dispStepCond');
    const dispStepCalc = document.getElementById('dispStepCalc');
    const stepExplanationBox = document.getElementById('stepExplanationBox');
    const btnAlgoSingle = document.getElementById('btnAlgoSingle');
    const btnAlgoDual = document.getElementById('btnAlgoDual');
    const stepperInputLabel = document.getElementById('stepperInputLabel');
    const stepperQuickBtns = document.getElementById('stepperQuickBtns');

    const fs1 = document.getElementById('fs1');
    const fs2 = document.getElementById('fs2');
    const fs3 = document.getElementById('fs3');
    const fsSkip = document.getElementById('fsSkip');
    const fsElse = document.getElementById('fsElse');
    const fs4 = document.getElementById('fs4');

    let currentStepperAlgo = 'single'; // 'single' | 'dual'

    window.switchStepperAlgo = function (algoKey) {
        currentStepperAlgo = algoKey;
        if (btnAlgoSingle && btnAlgoDual) {
            btnAlgoSingle.classList.toggle('active', algoKey === 'single');
            btnAlgoDual.classList.toggle('active', algoKey === 'dual');
        }

        if (algoKey === 'single') {
            if (stepperInputLabel) stepperInputLabel.textContent = "Test with input number:";
            if (stepNumInput) stepNumInput.value = "12";
            if (stepperQuickBtns) {
                stepperQuickBtns.innerHTML = `
                    <button class="quick-btn" onclick="setStepNum(15)">15 (&gt;10)</button>
                    <button class="quick-btn" onclick="setStepNum(5)">5 (&lt;10)</button>
                    <button class="quick-btn" onclick="setStepNum(10)">10 (not &gt;10)</button>
                `;
            }

            // Update diagram step text
            fs1.querySelector('.step-content').innerHTML = `<strong>INPUT number</strong> (value = <span id="dispStepVal">12</span>)`;
            fs2.querySelector('.step-content').innerHTML = `<strong>IF number &gt; 10 ?</strong> &rarr; <span id="dispStepCond">Evaluating...</span>`;
            fs3.querySelector('.step-content').innerHTML = `<strong>OUTPUT number * 2</strong> (<span id="dispStepCalc">24</span>)`;
            if (fsSkip) fsSkip.style.display = 'flex';
            if (fsElse) fsElse.style.display = 'none';

            stepExplanationBox.innerHTML = `Algorithm 1 (Single IF) loaded. Click "▶️ Trace Algorithm" to see the computer evaluate the line!`;
        } else {
            if (stepperInputLabel) stepperInputLabel.textContent = "Test with exam mark (0-100):";
            if (stepNumInput) stepNumInput.value = "75";
            if (stepperQuickBtns) {
                stepperQuickBtns.innerHTML = `
                    <button class="quick-btn" onclick="setStepNum(75)">75 (Pass &gt;=50)</button>
                    <button class="quick-btn" onclick="setStepNum(42)">42 (Fail &lt;50)</button>
                    <button class="quick-btn" onclick="setStepNum(50)">50 (Boundary Pass)</button>
                `;
            }

            // Update diagram step text for IF/ELSE
            fs1.querySelector('.step-content').innerHTML = `<strong>INPUT mark</strong> (value = <span id="dispStepVal">75</span>)`;
            fs2.querySelector('.step-content').innerHTML = `<strong>IF mark &gt;= 50 ?</strong> &rarr; <span id="dispStepCond">Evaluating...</span>`;
            fs3.querySelector('.step-content').innerHTML = `<strong>OUTPUT "Pass! 🎉"</strong>`;
            if (fsSkip) fsSkip.style.display = 'none';
            if (fsElse) fsElse.style.display = 'flex';

            stepExplanationBox.innerHTML = `Algorithm 2 (IF / ELSE) loaded. Click "▶️ Trace Algorithm" to trace the guaranteed dual branch!`;
        }
    };

    window.setStepNum = function (n) {
        if (stepNumInput) {
            stepNumInput.value = n;
            runStepperTrace();
        }
    };

    function clearStepHighlights() {
        [fs1, fs2, fs3, fsSkip, fsElse, fs4].forEach(el => el?.classList.remove('active-step'));
    }

    function runStepperTrace() {
        if (!stepNumInput) return;
        const val = parseFloat(stepNumInput.value) || 0;

        const valSpan = document.getElementById('dispStepVal');
        const condSpan = document.getElementById('dispStepCond');
        const calcSpan = document.getElementById('dispStepCalc');

        if (valSpan) valSpan.textContent = val;

        clearStepHighlights();
        btnRunStepper.disabled = true;

        if (currentStepperAlgo === 'single') {
            const isTrue = val > 10;
            if (calcSpan) calcSpan.textContent = val * 2;
            if (condSpan) {
                condSpan.textContent = isTrue ? 'TRUE' : 'FALSE';
                condSpan.style.color = isTrue ? 'var(--emerald)' : 'var(--amber)';
            }

            // Step 1: Input
            fs1.classList.add('active-step');
            stepExplanationBox.innerHTML = `<strong>Step 1:</strong> User enters <code>number = ${val}</code> into memory.`;

            setTimeout(() => {
                clearStepHighlights();
                fs2.classList.add('active-step');
                stepExplanationBox.innerHTML = `<strong>Step 2:</strong> Testing condition: <code>${val} &gt; 10</code> &rarr; <strong>${isTrue ? 'TRUE' : 'FALSE'}</strong>.`;

                setTimeout(() => {
                    clearStepHighlights();
                    if (isTrue) {
                        fs3.classList.add('active-step');
                        stepExplanationBox.innerHTML = `<strong>Step 3:</strong> Condition is <strong>TRUE</strong>! Executing indented code: <code>OUTPUT ${val} * 2</code> (Displays <strong>${val * 2}</strong>).`;
                    } else {
                        fsSkip?.classList.add('active-step');
                        stepExplanationBox.innerHTML = `<strong>Step 3:</strong> Condition is <strong>FALSE</strong>! <strong>Skipping</strong> inner code completely (no multiplication).`;
                    }

                    setTimeout(() => {
                        clearStepHighlights();
                        fs4.classList.add('active-step');
                        stepExplanationBox.innerHTML += `<br><strong>Step 4:</strong> Reached <code>ENDIF</code> &mdash; Program continues to subsequent lines.`;
                        btnRunStepper.disabled = false;
                    }, 1200);

                }, 1200);

            }, 1000);

        } else {
            // Algorithm 2: IF / ELSE (Exam Pass / Fail)
            const isPass = val >= 50;
            if (condSpan) {
                condSpan.textContent = isPass ? 'TRUE (PASS)' : 'FALSE (FAIL)';
                condSpan.style.color = isPass ? 'var(--emerald)' : 'var(--amber)';
            }

            // Step 1: Input
            fs1.classList.add('active-step');
            stepExplanationBox.innerHTML = `<strong>Step 1:</strong> User enters <code>mark = ${val}</code> into memory.`;

            setTimeout(() => {
                clearStepHighlights();
                fs2.classList.add('active-step');
                stepExplanationBox.innerHTML = `<strong>Step 2:</strong> Testing condition: <code>${val} &gt;= 50</code> &rarr; <strong>${isPass ? 'TRUE' : 'FALSE'}</strong>.`;

                setTimeout(() => {
                    clearStepHighlights();
                    if (isPass) {
                        fs3.classList.add('active-step');
                        stepExplanationBox.innerHTML = `<strong>Step 3:</strong> Condition is <strong>TRUE</strong>! Executing IF block: <code>OUTPUT "Pass! 🎉"</code>.`;
                    } else {
                        fsElse?.classList.add('active-step');
                        stepExplanationBox.innerHTML = `<strong>Step 3:</strong> Condition is <strong>FALSE</strong>! Executing <strong>ELSE</strong> block: <code>OUTPUT "Needs Retake! 📚"</code>.`;
                    }

                    setTimeout(() => {
                        clearStepHighlights();
                        fs4.classList.add('active-step');
                        stepExplanationBox.innerHTML += `<br><strong>Step 4:</strong> Both branches merge at <code>ENDIF</code> &mdash; Program prints "Grading complete".`;
                        btnRunStepper.disabled = false;
                    }, 1200);

                }, 1200);

            }, 1000);
        }
    }

    if (btnRunStepper) {
        btnRunStepper.addEventListener('click', runStepperTrace);
    }


    /* ========================================================
       5. BUG HUNTER MINI-GAME
       Includes common IF and IF/ELSE bugs
       ======================================================== */
    window.checkBug = function (bugId, isCorrect) {
        const item = document.getElementById(`bugItem${bugId}`);
        const feedback = document.getElementById(`bugFeedback${bugId}`);
        const buttons = item.querySelectorAll('.bug-opt-btn');

        buttons.forEach(btn => btn.disabled = true);

        if (isCorrect) {
            item.classList.add('fixed');
            feedback.innerHTML = `✅ <strong>Correct!</strong> `;
            feedback.style.color = 'var(--emerald)';

            if (bugId === 1) {
                feedback.innerHTML += `Python commands are case sensitive. <code>IF</code> must be lowercase <code>if</code>.`;
            } else if (bugId === 2) {
                feedback.innerHTML += `In Python, <code>=</code> assigns a value, while <code>==</code> tests equality!`;
            } else if (bugId === 3) {
                feedback.innerHTML += `Every Python if condition must end with a colon (<code>:</code>).`;
            } else if (bugId === 4) {
                feedback.innerHTML += `Relational operators must be ordered correctly: <code>&gt;=</code>, never <code>=&gt;</code>.`;
            } else if (bugId === 5) {
                feedback.innerHTML += `An <code>else:</code> statement must <strong>NEVER</strong> have a condition written after it! It automatically catches all cases where the <code>if</code> was False.`;
            } else if (bugId === 6) {
                feedback.innerHTML += `The <code>else:</code> keyword must end with a colon (<code>:</code>) and the statement block must be indented on a new line!`;
            }
        } else {
            feedback.innerHTML = `❌ <em>Not quite! Click to try again or check the correct rule.</em>`;
            feedback.style.color = 'var(--ruby)';
            setTimeout(() => {
                buttons.forEach(btn => btn.disabled = false);
            }, 1200);
        }
    };


    /* ========================================================
       6. PYTHON CODE LAB & SIMULATOR
       Supports Single-Branch (IF) and Two-Way (IF/ELSE)
       ======================================================== */
    const pythonEditor = document.getElementById('pythonEditor');
    const liveUserInput = document.getElementById('liveUserInput');
    const liveInputPromptText = document.getElementById('liveInputPromptText');
    const btnRunCode = document.getElementById('btnRunCode');
    const terminalScreen = document.getElementById('terminalScreen');
    const currentFileName = document.getElementById('currentFileName');
    const traceCond = document.getElementById('traceCond');
    const traceBool = document.getElementById('traceBool');
    const traceAction = document.getElementById('traceAction');
    const editorModeBadge = document.getElementById('editorModeBadge');

    const presets = {
        // Single IF Presets
        quiz: {
            filename: "color_quiz.py",
            modeBadge: "Python 3 Mode (Single IF)",
            promptLabel: "Enter user answer for colour:",
            defaultInput: "purple",
            isDual: false,
            code: `colour = input("What colour is made when red and blue are mixed? ")\nif colour == "purple":\n    print("That is correct! 🎉")\nprint("Quiz finished. Have a great day!")`,
            check: (inp) => ({
                condStr: `colour == "purple"`,
                boolVal: inp.trim().toLowerCase() === "purple",
                isDual: false,
                runsIndent: inp.trim().toLowerCase() === "purple",
                outputIndent: ["That is correct! 🎉"],
                outputAlways: ["Quiz finished. Have a great day!"]
            })
        },
        coaster: {
            filename: "height_check.py",
            modeBadge: "Python 3 Mode (Single IF)",
            promptLabel: "Enter height in cm (integer):",
            defaultInput: "145",
            isDual: false,
            code: `height = int(input("Enter your height in cm: "))\nif height >= 140:\n    print("You are tall enough! Enjoy the ride! 🎢")\nprint("Thanks for visiting the theme park!")`,
            check: (inp) => {
                const num = parseInt(inp, 10);
                const passed = !isNaN(num) && num >= 140;
                return {
                    condStr: `height >= 140 (value: ${isNaN(num) ? inp : num})`,
                    boolVal: passed,
                    isDual: false,
                    runsIndent: passed,
                    outputIndent: ["You are tall enough! Enjoy the ride! 🎢"],
                    outputAlways: ["Thanks for visiting the theme park!"]
                };
            }
        },
        discount: {
            filename: "grocery_discount.py",
            modeBadge: "Python 3 Mode (Single IF)",
            promptLabel: "Enter number of items bought:",
            defaultInput: "25",
            isDual: false,
            code: `items = int(input("Enter items bought: "))\nif items >= 20:\n    print("Congratulations! 10% bulk discount applied! 🏷️")\nprint("Thank you for shopping with us!")`,
            check: (inp) => {
                const num = parseInt(inp, 10);
                const passed = !isNaN(num) && num >= 20;
                return {
                    condStr: `items >= 20 (value: ${isNaN(num) ? inp : num})`,
                    boolVal: passed,
                    isDual: false,
                    runsIndent: passed,
                    outputIndent: ["Congratulations! 10% bulk discount applied! 🏷️"],
                    outputAlways: ["Thank you for shopping with us!"]
                };
            }
        },
        joke: {
            filename: "robot_joke.py",
            modeBadge: "Python 3 Mode (Single IF)",
            promptLabel: "Do you want to hear a joke? (yes/no):",
            defaultInput: "yes",
            isDual: false,
            code: `userChoice = input("Do you want to hear a joke? ")\nif userChoice == "yes":\n    print("How do robots eat pizza?")\n    print("One byte at a time! 🤖🍕")\nprint("Program finished.")`,
            check: (inp) => {
                const passed = inp.trim().toLowerCase() === "yes";
                return {
                    condStr: `userChoice == "yes"`,
                    boolVal: passed,
                    isDual: false,
                    runsIndent: passed,
                    outputIndent: ["How do robots eat pizza?", "One byte at a time! 🤖🍕"],
                    outputAlways: ["Program finished."]
                };
            }
        },

        // IF / ELSE Presets (Two-Way Selection)
        exam: {
            filename: "exam_results.py",
            modeBadge: "Python 3 Mode (IF / ELSE)",
            promptLabel: "Enter student exam mark (0-100):",
            defaultInput: "75",
            isDual: true,
            code: `mark = int(input("Enter exam score (0-100): "))\nif mark >= 50:\n    print("Status: PASSED! 🎉")\n    print("Congratulations on your hard work!")\nelse:\n    print("Status: FAILED. 📚")\n    print("Please schedule a retake exam.")\nprint("End of report card.")`,
            check: (inp) => {
                const num = parseInt(inp, 10);
                const passed = !isNaN(num) && num >= 50;
                return {
                    condStr: `mark >= 50 (value: ${isNaN(num) ? inp : num})`,
                    boolVal: passed,
                    isDual: true,
                    runsIf: passed,
                    runsElse: !passed,
                    outputIf: ["Status: PASSED! 🎉", "Congratulations on your hard work!"],
                    outputElse: ["Status: FAILED. 📚", "Please schedule a retake exam."],
                    outputAlways: ["End of report card."]
                };
            }
        },
        evenodd: {
            filename: "even_or_odd.py",
            modeBadge: "Python 3 Mode (IF / ELSE)",
            promptLabel: "Enter a whole number:",
            defaultInput: "8",
            isDual: true,
            code: `number = int(input("Enter a whole number: "))\nif number % 2 == 0:\n    print("Result: That is an EVEN number! ⚡")\nelse:\n    print("Result: That is an ODD number! 🌟")\nprint("Number analysis complete.")`,
            check: (inp) => {
                const num = parseInt(inp, 10);
                const isEven = !isNaN(num) && (num % 2 === 0);
                return {
                    condStr: `number % 2 == 0 (value: ${isNaN(num) ? inp : num})`,
                    boolVal: isEven,
                    isDual: true,
                    runsIf: isEven,
                    runsElse: !isEven,
                    outputIf: ["Result: That is an EVEN number! ⚡"],
                    outputElse: ["Result: That is an ODD number! 🌟"],
                    outputAlways: ["Number analysis complete."]
                };
            }
        },
        ticket: {
            filename: "ticket_pricing.py",
            modeBadge: "Python 3 Mode (IF / ELSE)",
            promptLabel: "Enter visitor age:",
            defaultInput: "10",
            isDual: true,
            code: `age = int(input("Enter visitor age: "))\nif age < 12:\n    print("Ticket Category: Child Ticket ($10) 🎟️")\nelse:\n    print("Ticket Category: Standard Adult Ticket ($20) 🎫")\nprint("Enjoy your day at the adventure park!")`,
            check: (inp) => {
                const num = parseInt(inp, 10);
                const isChild = !isNaN(num) && num < 12;
                return {
                    condStr: `age < 12 (value: ${isNaN(num) ? inp : num})`,
                    boolVal: isChild,
                    isDual: true,
                    runsIf: isChild,
                    runsElse: !isChild,
                    outputIf: ["Ticket Category: Child Ticket ($10) 🎟️"],
                    outputElse: ["Ticket Category: Standard Adult Ticket ($20) 🎫"],
                    outputAlways: ["Enjoy your day at the adventure park!"]
                };
            }
        },
        secret: {
            filename: "security_gate.py",
            modeBadge: "Python 3 Mode (IF / ELSE)",
            promptLabel: "Enter security password:",
            defaultInput: "python123",
            isDual: true,
            code: `password = input("Enter security password: ")\nif password == "python123":\n    print("Access Granted! Welcome inside, Agent. 🔓")\nelse:\n    print("Access Denied! Intruder alert! 🚨")\nprint("Security protocol finished.")`,
            check: (inp) => {
                const passed = inp.trim() === "python123";
                return {
                    condStr: `password == "python123"`,
                    boolVal: passed,
                    isDual: true,
                    runsIf: passed,
                    runsElse: !passed,
                    outputIf: ["Access Granted! Welcome inside, Agent. 🔓"],
                    outputElse: ["Access Denied! Intruder alert! 🚨"],
                    outputAlways: ["Security protocol finished."]
                };
            }
        }
    };

    let activePreset = 'quiz';

    window.loadPreset = function (key) {
        if (!presets[key]) return;
        activePreset = key;

        document.querySelectorAll('.preset-tabs .tab-btn, .preset-section-row .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-preset') === key);
        });

        const p = presets[key];
        currentFileName.textContent = p.filename;
        if (editorModeBadge) editorModeBadge.textContent = p.modeBadge;
        pythonEditor.value = p.code;
        liveInputPromptText.textContent = p.promptLabel;
        liveUserInput.value = p.defaultInput;

        terminalScreen.innerHTML = `
            <div class="term-line term-system">Loaded ${p.filename} (${p.isDual ? 'IF / ELSE Dual Branch' : 'Single IF'})</div>
            <div class="term-line term-system">Click "▶ Run Code" to test with current input.</div>
        `;

        // Clear trace panel
        traceCond.textContent = "-";
        traceBool.textContent = "-";
        traceBool.className = "trace-val badge-val";
        traceAction.textContent = "Awaiting execution...";
        traceAction.style.color = "var(--text-muted)";
    };

    window.clearTerminal = function () {
        terminalScreen.innerHTML = `<div class="term-line term-system">Terminal cleared.</div>`;
    };

    function runPythonSimulation() {
        const p = presets[activePreset];
        const userVal = liveUserInput.value;
        const res = p.check(userVal);

        terminalScreen.innerHTML = `
            <div class="term-line term-system">&gt;&gt;&gt; Running ${p.filename}...</div>
            <div class="term-line term-input">&gt; User entered input: "${userVal}"</div>
        `;

        // Update Trace Box
        traceCond.textContent = res.condStr;
        traceBool.textContent = res.boolVal ? 'True' : 'False';
        traceBool.className = res.boolVal ? 'trace-val badge-val pill-true' : 'trace-val badge-val pill-false';

        if (res.isDual) {
            // IF / ELSE Two-Way Selection
            if (res.runsIf) {
                traceAction.textContent = "Condition is TRUE &rarr; IF block executed!";
                traceAction.style.color = "var(--emerald)";

                res.outputIf.forEach(line => {
                    terminalScreen.innerHTML += `<div class="term-line term-output">&gt; ${line}</div>`;
                });
            } else {
                traceAction.textContent = "Condition is FALSE &rarr; ELSE block executed!";
                traceAction.style.color = "var(--amber)";

                res.outputElse.forEach(line => {
                    terminalScreen.innerHTML += `<div class="term-line term-output" style="color:var(--amber);">&gt; ${line}</div>`;
                });
            }
        } else {
            // Single IF One-Way Selection
            if (res.runsIndent) {
                traceAction.textContent = "Condition is TRUE &rarr; Indented block executed!";
                traceAction.style.color = "var(--emerald)";

                res.outputIndent.forEach(line => {
                    terminalScreen.innerHTML += `<div class="term-line term-output">&gt; ${line}</div>`;
                });
            } else {
                traceAction.textContent = "Condition is FALSE &rarr; Indented block was skipped (no ELSE)!";
                traceAction.style.color = "var(--amber)";

                terminalScreen.innerHTML += `<div class="term-line term-skip">&gt; [Condition was False &rarr; Inner statements skipped]</div>`;
            }
        }

        // Always print unindented code lines
        res.outputAlways.forEach(line => {
            terminalScreen.innerHTML += `<div class="term-line text-white">&gt; ${line}</div>`;
        });

        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }

    if (btnRunCode) {
        btnRunCode.addEventListener('click', runPythonSimulation);
        loadPreset('quiz');
    }


    /* ========================================================
       7. CHECK YOUR PROGRESS: INTERACTIVE GRADE 8 QUIZ
       Comprehensive: IF, IF/ELSE, Pseudocode & Python
       ======================================================== */
    const quizData = [
        {
            question: "What is the primary role of a conditional (selection) statement in programming?",
            snippet: null,
            options: [
                "To repeat code inside a loop 100 times",
                "To allow a program to test a condition and choose whether to execute specific statements",
                "To delete variables from computer memory",
                "To translate Python into machine binary without running it"
            ],
            answer: 1,
            explanation: "Conditional statements (selection) allow programs to make decisions by executing statements depending on whether a condition is True or False."
        },
        {
            question: "In pseudocode, how do we correctly conclude a two-way (IF / THEN / ELSE) statement?",
            snippet: "IF mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Fail\"\n???",
            options: [
                "STOP IF",
                "ENDIF",
                "FINISH",
                "ELSE END"
            ],
            answer: 1,
            explanation: "In textbook pseudocode, every IF statement (whether single-branch or with an ELSE branch) concludes with the ENDIF keyword."
        },
        {
            question: "Which comparison operator correctly checks if two values are equal in Python?",
            snippet: "if temperature ??? 30:",
            options: [
                "= (single equals)",
                "== (double equals)",
                "=> (equals arrow)",
                "equals"
            ],
            answer: 1,
            explanation: "In Python, '==' is used to compare equality. A single '=' is reserved for assigning a value to a variable."
        },
        {
            question: "Why does Python's 'else:' statement NEVER take a condition?",
            snippet: "# Which is correct?\nelse:\n# OR:\nelse score < 50:",
            options: [
                "Because 'else:' automatically catches every case where the 'if' condition evaluated to False!",
                "Because Python only allows conditions that are written in capital letters",
                "Because 'else:' can only be used with numbers, not variables",
                "Because you must put the condition inside quotes instead"
            ],
            answer: 0,
            explanation: "'else:' requires no condition! It serves as the automatic default fallback for all cases where the 'if' test was False."
        },
        {
            question: "In Python, how does the computer know which lines belong inside the 'if' and 'else' blocks?",
            snippet: "if score >= 50:\n    print(\"Passed!\")\nelse:\n    print(\"Retake!\")\nprint(\"Report complete\")",
            options: [
                "By using the ENDIF keyword",
                "By using indentation (4 spaces / Tab). Unindented lines run for everyone!",
                "By wrapping every block in parentheses ()",
                "By using semicolons at the end of each line"
            ],
            answer: 1,
            explanation: "Python uses indentation! Indented lines belong to the 'if' or 'else' block above them. Once code returns to the left margin, it runs unconditionally."
        },
        {
            question: "What will this Python program output when run?",
            snippet: "score = 42\nif score >= 50:\n    print(\"Passed!\")\nelse:\n    print(\"Needs retake!\")\nprint(\"Have a great day!\")",
            options: [
                "Passed! and Have a great day!",
                "Needs retake! and Have a great day!",
                "Needs retake! only",
                "Passed! and Needs retake!"
            ],
            answer: 1,
            explanation: "Since 42 >= 50 is FALSE, the IF block is skipped and the ELSE block executes, printing 'Needs retake!'. Then the unindented print() executes, printing 'Have a great day!'."
        },
        {
            question: "Which line contains a critical Python syntax error?",
            snippet: "Line 1: if age >= 18:\nLine 2:     print(\"Adult\")\nLine 3: else age < 18:\nLine 4:     print(\"Minor\")",
            options: [
                "Line 1 (needs quotes around 18)",
                "Line 2 (print cannot be indented)",
                "Line 3 (else: must NOT have a condition after it!)",
                "Line 4 (minor must be capitalized)"
            ],
            answer: 2,
            explanation: "Line 3 is an error: 'else' must NEVER have a condition written after it! It should simply be 'else:'."
        }
    ];

    let currentQIndex = 0;
    let quizScore = 0;

    const currentQNum = document.getElementById('currentQNum');
    const currentScore = document.getElementById('currentScore');
    const quizProgressFill = document.getElementById('quizProgressFill');
    const quizBody = document.getElementById('quizBody');

    function renderQuestion() {
        if (!quizBody) return;

        if (currentQIndex >= quizData.length) {
            renderQuizSummary();
            return;
        }

        const q = quizData[currentQIndex];
        currentQNum.textContent = currentQIndex + 1;
        currentScore.textContent = quizScore;
        quizProgressFill.style.width = `${((currentQIndex + 1) / quizData.length) * 100}%`;

        let snippetHtml = '';
        if (q.snippet) {
            snippetHtml = `<pre class="quiz-snippet"><code>${q.snippet}</code></pre>`;
        }

        let optionsHtml = '';
        q.options.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            optionsHtml += `
                <button class="quiz-option-btn" data-index="${idx}" onclick="selectQuizOption(${idx})">
                    <span class="opt-letter">${letter}</span>
                    <span class="opt-text">${opt}</span>
                </button>
            `;
        });

        quizBody.innerHTML = `
            <div class="quiz-card">
                <h3 class="quiz-question-title">${q.question}</h3>
                ${snippetHtml}
                <div class="quiz-options-list" id="quizOptionsList">
                    ${optionsHtml}
                </div>
                <div id="quizFeedbackBox"></div>
            </div>
        `;
    }

    window.selectQuizOption = function (selectedIdx) {
        const q = quizData[currentQIndex];
        const buttons = document.querySelectorAll('.quiz-option-btn');
        buttons.forEach(b => b.disabled = true);

        const isCorrect = (selectedIdx === q.answer);
        if (isCorrect) {
            quizScore++;
            currentScore.textContent = quizScore;
        }

        buttons.forEach((btn, idx) => {
            if (idx === q.answer) {
                btn.classList.add('correct');
            } else if (idx === selectedIdx && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        const feedbackBox = document.getElementById('quizFeedbackBox');
        feedbackBox.innerHTML = `
            <div class="quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}">
                <strong>${isCorrect ? '🎉 Correct!' : '❌ Incorrect!'}</strong> ${q.explanation}
            </div>
            <button class="btn-primary next-q-btn" onclick="nextQuestion()">
                <span>${currentQIndex === quizData.length - 1 ? 'See Final Score 🏆' : 'Next Question ➜'}</span>
            </button>
        `;
    };

    window.nextQuestion = function () {
        currentQIndex++;
        renderQuestion();
    };

    function renderQuizSummary() {
        const percentage = Math.round((quizScore / quizData.length) * 100);
        let badge = "🌟 Good Effort!";
        if (quizScore === quizData.length) badge = "🏆 IF & IF/ELSE Master (100%)!";
        else if (quizScore >= 5) badge = "🥈 Solid Programming Thinker!";

        quizBody.innerHTML = `
            <div class="quiz-card" style="text-align: center; align-items: center;">
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 class="quiz-question-title">Quiz Completed!</h3>
                <p style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    You scored <strong>${quizScore}</strong> out of <strong>${quizData.length}</strong> (${percentage}%)
                </p>
                <div class="result-badge true-glow" style="margin-bottom: 1.5rem;">${badge}</div>
                <p style="max-width: 520px; color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    You have mastered both single-branch IF and dual-branch IF/ELSE statements across pseudocode and Python!
                </p>
                <button class="btn-primary" onclick="restartQuiz()">
                    <span>🔄 Retake Quiz</span>
                </button>
            </div>
        `;
    }

    window.restartQuiz = function () {
        currentQIndex = 0;
        quizScore = 0;
        renderQuestion();
    };

    if (quizBody) {
        renderQuestion();
    }

});
